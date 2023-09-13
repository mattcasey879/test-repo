import { useContext, useEffect } from "react";
import { Button, CssBaseline, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../../contexts/ToastContext";

import { attemptLogin } from "../../services/httpService/api";
import useForm from "../../utils/useForm";

const Login = (props) => {
  const navigate = useNavigate();
  const { values, errors, setErrors, handleChange } = useForm({
    email: "",
    password: "",
  });

  const { loggedIn } = props;

  useEffect(() => {
    if (loggedIn) {
      navigate("/employees");
    }
  }, [loggedIn, navigate]);
  const { showToast } = useContext(ToastContext);

  const validate = () => {
    let errorMessages = {};

    errorMessages.email = !values.email
      ? "This field cannot be blank"
      : !/^[a-zA-Z0-9]*@[a-zA-Z]+\.[a-zA-Z]+$/.test(values.email)
      ? "Email is not valid"
      : "";

    errorMessages.password = !values.password
      ? "This field cannot be blank"
      : !/^[A-Za-z0-9]*$/.test(values.password)
      ? "Password can only contain letters and numbers"
      : values.password.trim().length < 8 || values.password.trim().length > 35
      ? "Password must be between 8 and 35 characters"
      : "";
    setErrors({
      ...errorMessages,
    });
    return Object.values(errorMessages).every((msg) => msg === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      attemptLogin(values)
        .then((res) => {
          localStorage.setItem(
            "AuthenticationToken",
            res.headers.authorization
          );
          props.setLoggedIn(true);
          navigate("/employees");
          showToast({
            message: "Logged In Successfully!",
            severity: "success",
          });
        })
        .catch((err) => {
          if (!err.response) {
            showToast({
              message: err.message,
              severity: 'error'
            })
          } else {
            showToast({
              message: err.response.data,
              severity: "error",
            });
          }
        });
    }
  };

  return (
    <>
      <CssBaseline />
      <main>
        <Container maxWidth="sm">
          <Box
            maxWidth="md"
            sx={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Sign in</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                onChange={handleChange}
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                fullWidth
                type="password"
                id="password"
                label="Password"
                onChange={handleChange}
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ margin: "2% 40%", width: "20%", fontSize: ".8rem" }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Login;
