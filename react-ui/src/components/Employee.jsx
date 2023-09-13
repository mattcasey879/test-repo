import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  Tooltip,
  Popover,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteEmployee from "./DeleteEmployee";
import { formatLabel, getUserRole } from "../utils/helpers";

const Employee = (props) => {
  const { employee, setEmployees, employees } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const role = getUserRole();

  const handlePopOver = (event) => {
    setAnchorEl(event.target);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div>
      <Card>
        <CardHeader
          title={
            <Typography variant="h5">
              {employee.firstName} {employee.lastName}
            </Typography>
          }
          action={
            role === "admin" && (
              <div>
                <Tooltip title="Edit Employee">
                  <Link to={`/employees/edit/${employee.id}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                </Tooltip>

                <Tooltip title="Delete Employee">
                  <IconButton
                    onClick={handlePopOver}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Popover
                  sx={{ marginTop: "1%", marginRight: "5%" }}
                  id="delete-pop"
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <DeleteEmployee
                    employees={employees}
                    handleClose={handleClose}
                    employee={employee}
                    setEmployees={setEmployees}
                  />
                </Popover>
              </div>
            )
          }
        />

        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignContent="space-around"
          >
            {Object.keys(employee).map((key) => {
              if (
                key === "id" ||
                key === "userId" ||
                key === "firstName" ||
                key === "lastName"
              ) {
                return <React.Fragment key={key}></React.Fragment>;
              } else {
                return (
                  <Typography key={key} sx={{ mb: "1rem" }}>
                    <span style={{ fontWeight: "bold" }}>
                      {formatLabel(key)}: 
                    </span>
                     <span> {employee[key]}</span>
                  </Typography>
                );
              }
            })}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employee;
