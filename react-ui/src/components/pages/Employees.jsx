import { CircularProgress, Container, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";

import Employee from '../Employee'
import { getEmployees } from "../../services/httpService/api";
import { ToastContext } from "../../contexts/ToastContext";
import { removeToken } from "../../utils/helpers";

const Employees = (props) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast, authErrorToast } = useContext(ToastContext);

  useEffect(() => {
    setLoading(true);
    getEmployees()
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if(!err.response) {
          showToast({
            message: err.message,
            severity: "error",
          });
          setLoading(false)
          return
        }
        if (err.response.status === 403) {
            removeToken()
            authErrorToast()
            setLoading(false)
            return
        } 
          showToast({
            message: "Server Error",
            severity: "error",
          });
        
        setLoading(false);
      });
  // eslint-disable-next-line
  }, []);

  return employees ? (
    <Container sx={{ marginTop: "3%", maxWidth: "50%" }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: "3rem" }}>
        All Employees
      </Typography>
      {loading ? (
        <CircularProgress sx={{ margin: "20% 45%" }} />
      ) : (
        employees.map((em) => (
          <Box
            key={em.email}
            display="flex"
            flexDirection="column"
            alignContent="center"
            sx={{
              margin: "auto",
              boxShadow: "2px 2px 5px #888",
              marginBottom: "3%",
              maxWidth: "50%",
            }}
          >
            <Employee
              employee={em}
              employees={employees}
              setEmployees={setEmployees}
            />
          </Box>
        ))
      )}
    </Container>
  ) : (
    <></>
  );
};

export default Employees;
