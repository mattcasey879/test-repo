import { Typography, Button, Icon } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Container } from "@mui/system";
import { deleteEmployee } from "../services/httpService/api";
import { ToastContext } from "../contexts/ToastContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/helpers";

const DeleteEmployee = (props) => {
  const { showToast, authErrorToast } = useContext(ToastContext);
  const { employee, handleClose, employees, setEmployees } = props;
  const navigate = useNavigate()

  const handleDelete = () => {
    deleteEmployee(employee.id)
      .then((res) => {
        setEmployees(employees.filter((em) => em.id !== employee.id));
        handleClose();
        showToast({
          message: "Employee Deleted Successfully!",
          severity: "success",
        });
      })
      .catch((err) => {
        console.log(err)
        if(!err.response) {
          showToast({
            message: err.message,
            severity: "error",
          });
          return
        }
        if (err.response && err.response.status === 403) {
          removeToken();
          authErrorToast();
          navigate("/")
        } else {
          showToast({
            message: err.response.data.message,
            severity: 'error'
          })
        }
      });
  };

  return (
    <>
      <Container sx={{ padding: "3%" }}>
        <Typography>
          <Icon sx={{ paddingRight: "1%" }}>
            <WarningAmberIcon fontSize="small" color="error" />
          </Icon>
          Are you sure you want to delete this Employee? This cannot be undone.
        </Typography>
        <Button
          onClick={handleClose}
          sx={{ fontSize: "70%" }}
          size="small"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          size="small"
          sx={{ margin: "0 1%", fontSize: "70%" }}
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Confirm
        </Button>
      </Container>
    </>
  );
};

export default DeleteEmployee;
