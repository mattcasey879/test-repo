import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { formatLabel, removeToken } from "../utils/helpers";
import stateLabelValues from "../utils/states";
import useForm from "../utils/useForm";
import React, { useEffect, useContext  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmploye,
  sendNewEmployee,
} from "../services/httpService/api";
import { ToastContext } from "../contexts/ToastContext";

const EmployeeForm = (props) => {
  const { id } = useParams();
  const {setEditMode, editMode} = props
  setEditMode(id != null)
  const { showToast, authErrorToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const initialEmployeeState = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    state: "",
    city: "",
    zip: "",
    homePhone: "",
    cellPhone: "",
  };

  const { values, setValues, handleChange, errors, setErrors } = useForm(initialEmployeeState);

  useEffect(() => {
    if (editMode) {
      getEmployeeById(id)
        .then((res) => {
          setValues(res.data);
        })
        .catch((err) => {
          if(!err.response) {
            showToast({
              message: err.message,
              severity: "error",
            });
            return
          }
          if (err.response.status === 403) {
            removeToken();
            authErrorToast();
          } else {
            showToast({
              message: "Server Error",
              severity: 'error'
            })
          }
        });
    } else {
      setValues(initialEmployeeState);
    }
    // eslint-disable-next-line
  }, [props.editMode]);

  const validate = () => {
    let errorMessages = {};

    // Logic to check if any of the fields are blank and checking first and last name 
    // AND home and cell phone numbers for same validation
    Object.keys(values).forEach((key) => {
      if (key === "firstName" || key === "lastName") {
        errorMessages[key] = !values[key]
          ? `${formatLabel(key)} is required`
          : !/^[a-zA-Z ]+$/.test(values[key])
          ? "Only letters are allowed"
          : values[key].length < 2 || values[key].length > 35
          ? "Must be between 2 and 35 characters."
          : "";
      }
      if (key === "cellPhone" || key === "homePhone") {
        errorMessages[key] = !values[key]
          ? `${formatLabel(key)} is required`
          : !/^\d{3}[-]\d{3}[-]\d{4}$/.test(values[key])
          ? "Format allowed XXX-XXX-XXXX"
          : values[key].length > 12
          ? "Must only include 10 numbers"
          : "";
      }
    });
    errorMessages.address = !values.address
      ? "Address is required"
      : !/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/.test(values.address)
      ? "Only letters and numbers are allowed"
      : values.address.length < 10 || values.address.lenght > 50
      ? "Must be between 10 and 50 characters"
      : "";

    errorMessages.city = !values.city
      ? "City is required"
      : !/^[a-zA-z]+( [a-zA-Z]+)*$/.test(values.city)
      ? "Only letters allowed"
      : values.city.length < 5 || values.city.length > 50
      ? "Must be between 5 and 50 Characters"
      : "";

    errorMessages.state = !values.state ? "State is required" : "";

    errorMessages.zip = !values.zip
      ? "Zip is required"
      : !/^[0-9]+$/.test(values.zip)
      ? "Only digits can be used"
      : values.zip.length < 5 || values.zip.length > 9
      ? "Must be between 5 and 9 Numbers"
      : "";

    errorMessages.email = !values.email
      ? "Email is required"
      : !/^[a-zA-Z0-9]*@[a-zA-Z]+\.[a-zA-Z]+$/.test(values.email)
      ? "Email is not valid"
      : "";

    setErrors({
      ...errorMessages,
    });
    return Object.values(errorMessages).every((msg) => msg === "");
  };
  const handleSubmit = (employee) => {
    if (id) {
      updateEmploye(employee, id)
        .then((res) => {
          showToast({
            message: "Employee updated!",
            severity: "success",
          });
          navigate("/employees");
        })
        .catch((err) => {
          if (!err.response) {
            showToast({
              message: err.message,
              severity: "error"
            })
          }
          if (err.response.status === 403) {
            removeToken()
            authErrorToast();
          }
          showToast({
            message: "Error updating Employee",
            severity: "error",
          });
        });
    } else {
      sendNewEmployee(employee)
        .then((res) => {
          showToast({
            message: "Employee Saved!",
            severity: "success",
          });
          navigate("/employees");
        })
        .catch((err) => {
          if (!err.response) {
            showToast({
              message: err.message,
              severity: "error"
            })
          }
          if (err.response.status === 403) {
            removeToken()
            authErrorToast();
          }
          setValues(initialEmployeeState);
          showToast({
            message: err.response.data.message,
            severity: "error",
          });
        });
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      handleSubmit(values);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          margin: "auto",
          width: "100%",
        }}
      >
        {Object.keys(values).map((key, i) => {
          if (key === "id" || key === "userId") {
            return <React.Fragment key={key}></React.Fragment>;
          } else if (key === "state") {
            return (
              <FormControl
                key={i}
                sx={{ width: "41%", marginTop: "3%", backgroundColor: "white" }}
              >
                <InputLabel id="state-select">State</InputLabel>
                <Select
                  key={key}
                  labelId="State-Select"
                  id="state"
                  label="State"
                  name="state"
                  onChange={handleChange}
                  value={values.state}
                  {... (errors.state) && {error: true}}
                >
                  {stateLabelValues.map((state) => {
                    return (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    );
                  })}
                </Select>
                {errors.state ? <FormHelperText sx={{color: 'red'}}>{errors.state}</FormHelperText>: <></>}
              </FormControl>
            );
          } else {
            return (
              <TextField
                sx={{ width: "41%", marginTop: "3%", backgroundColor: "white" }}
                onChange={handleChange}
                margin="normal"
                key={key}
                id={key}
                value={values[key]}
                label={formatLabel(key)}
                {...(errors[key] && { error: true, helperText: errors[key] })}
              ></TextField>
            );
          }
        })}
      </Box>
      <Button
        type="submit"
        variant="contained"
        sx={{ width: "15%", margin: "2.5% 45%" }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default EmployeeForm;
