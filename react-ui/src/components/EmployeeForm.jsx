import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { formatLabel } from "../utils/helpers";
import stateLabelValues from "../utils/states";
import useForm from "../utils/useForm";

const EmployeeForm = (props) => {
  const { handleSubmit, employeeState } = props;

  const { values, handleChange, errors, setErrors } = useForm(employeeState);

  const validate = () => {
    let errorMessages = {};

    // Logic to check if any of the fields are blank and checking first and last name AND home and cell phone numbers for same validation
    Object.keys(values).forEach((key) => {
      if (key === "firstName" || key === "lastName") {
        errorMessages[key] = !values[key]
          ? "This field is required"
          : !/^[a-zA-Z ]+$/.test(values[key])
          ? "Only letters are allowed"
          : values[key].length < 2 || values[key].length > 35
          ? "Must be between 2 and 35 characters."
          : "";
      }
      if (key === "cellPhone" || key === "homePhone") {
        errorMessages[key] = !values[key]
          ? "This field is required"
          : !/^\d{3}[-]\d{3}[-]\d{4}$/.test(values[key])
          ? "Format allowed XXX-XXX-XXXX"
          : values[key].length > 12
          ? "Must only include 10 numbers"
          : "";
      }
    });
    errorMessages.address = !values.address
      ? "This field is required"
      : !/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/.test(values.address)
      ? "Only letters and numbers are allowed"
      : values.address.length < 10 || values.address.lenght > 50
      ? "Must be between 10 and 50 characters"
      : "";

    errorMessages.city = !values.city
      ? "This field is required"
      : !/^[a-zA-z]+( [a-zA-Z]+)*$/.test(values.city)
      ? "Only letters allowed"
      : values.city.length < 5 || values.city.length > 50
      ? "Must be between 5 and 50 Characters"
      : "";

    errorMessages.state = !values.state ? "This field is required" : "";

    errorMessages.zip = !values.zip
      ? "This field is required"
      : !/^[0-9]+$/.test(values.zip)
      ? "Only digits can be used"
      : values.zip.length < 5 || values.zip.length > 9
      ? "Must be between 5 and 9 Numbers"
      : "";

    errorMessages.email = !values.email
      ? "This field is required"
      : !/^[a-zA-Z\d]{8,35}@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(values.email)
      ? "Email is not valid"
      : "";

    setErrors({
      ...errorMessages,
    });
    return Object.values(errorMessages).every((msg) => msg === "");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      handleSubmit(values);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          margin: "auto",
          width: "100%",
        }}
      >
        {Object.keys(values).map((key, i) => {
          if (key === "id" || key === "userId") {
            return <></>;
          } else if (key === "state") {
            return (
              <FormControl key={i} sx={{ width: "41%", marginTop: "3%" }}>
                <InputLabel id="state-select">State</InputLabel>
                <Select
                  key={i}
                  labelId="State-Select"
                  id="state"
                  label="State"
                  name="state"
                  onChange={handleChange}
                  defaultValue={values.state}
                  {...(errors.state && {
                    error: true,
                    helperText: errors.state,
                  })}
                >
                  {stateLabelValues.map((state) => {
                    return (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            );
          } else {
            return (
              <TextField
                sx={{ width: "41%", marginTop: "3%" }}
                onChange={handleChange}
                margin="normal"
                key={i}
                id={key}
                defaultValue={values[key]}
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
        sx={{ width: "35%", margin: "2.5% 33%" }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default EmployeeForm;
