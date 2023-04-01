import { CssBaseline, Typography} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendNewEmployee } from "../api/api";
import EmployeeForm from "../components/EmployeeForm";

const CreateEmployee = () => {
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
  const [error, setError] = useState("")
  const handleSubmit = (employee) => {
    sendNewEmployee(employee)
      .then((res) => {
        setError("")
        navigate("/employees");
      })
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 5, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <Typography margin="3% auto" variant="h5">
            Create new Employee
          </Typography>
          <EmployeeForm
            handleSubmit={handleSubmit}
            employeeState={initialEmployeeState}
          />
        </Box>
        {error ? (
          <Typography variant="p" color="red">{error}</Typography>
        ) :
        <></>
      }
      </Container>
    </>
  );
};

export default CreateEmployee;
