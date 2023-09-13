import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id ? event.target.id : event.target.name]:
        event.target.value,
    });
  };
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
  };
};

export default useForm;
