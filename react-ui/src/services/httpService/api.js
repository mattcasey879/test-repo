import axios from "axios";
import {httpConstants} from "../ServiceConstants";
import { getToken } from "../../utils/helpers";

axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.url !== `${httpConstants.backEndDevURL}/loginServce/**`) {
    config.headers["Authorization"] = token;
  }
  return config;
});
export const getEmployees = () => {
  return axios.get(
    `${httpConstants.backEndDevURL}/employeeService/employee/all`
  );
};

export const getEmployeeById = (id) => {
  return axios.get(
    `${httpConstants.backEndDevURL}/employeeService/employee/${id}`
  );
};

export const sendNewEmployee = (data) => {
  return axios.post(
    `${httpConstants.backEndDevURL}/employeeService/employee`,
    data
  );
};

export const updateEmploye = (data, id) => {
  return axios.put(
    `${httpConstants.backEndDevURL}/employeeService/employee/${id}`,
    data
  );
};

export const deleteEmployee = (id) => {
  return axios.delete(
    `${httpConstants.backEndDevURL}/employeeService/employee/${id}`
  );
};

export const attemptLogin = (data) => {
  return axios.post(`${httpConstants.backEndDevURL}/loginService/login`, data);
};
