import { CssBaseline, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import EmployeeForm from "../EmployeeForm";

const CreateEditEmployee = (props) => {
  const {editMode, setEditMode } = props



  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 5, mb: 3 }}>
        <Typography margin="3% auto" variant="h5" sx={{ textAlign: "center" }}>
          {editMode ? "Edit Employee" : "Create Employee"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <EmployeeForm
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </Box>
      </Container>
    </>
  );
};

export default CreateEditEmployee;
