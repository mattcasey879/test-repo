import { CssBaseline, Typography } from "@mui/material";
import { Container } from "@mui/system";
import EmployeeForm from "./EmployeeForm";
import { updateEmploye } from "../api/api";

const EditEmployee = (props) => {
  const {handleModalClose, employee, employees, setEmployees } = props;

  const handleSubmit = (employee) => {
    updateEmploye(employee, employee.id).then((res) => {
      setEmployees(employees.map((em) => {
        return em.id === employee.id ? employee : em 
      }))
    } )
    .catch((err) => console.log(err))
    handleModalClose();
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <Typography variant="h5" margin="0 38%">
          Edit Employee
        </Typography>
          <EmployeeForm handleSubmit={handleSubmit} employeeState={employee} />
      </Container>
    </>
  );
};

export default EditEmployee;
