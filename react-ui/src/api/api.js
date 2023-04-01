import axios from 'axios'
import httpConstants from './httpConstants'



export const getEmployees = () => {
    return axios.get(`${httpConstants.backEndDevURL}/employeeService/employee/all`, {
        headers: {
            "Authorization": localStorage.getItem("AuthenticationToken")
        }
    })
}

export const sendNewEmployee = (data) => {
    return axios.post(`${httpConstants.backEndDevURL}/employeeService/employee`, data, {
        headers: {
            "Authorization": localStorage.getItem("AuthenticationToken")
        }
    })
}

export const updateEmploye = (data, id) => {
    return axios.put(`${httpConstants.backEndDevURL}/employeeService/employee/${id}`, data, {
        headers: {
            "Authorization": httpConstants.JWT
        }
    })
}

export const deleteEmployee = (id) => {
    return axios.delete(`${httpConstants.backEndDevURL}/employeeService/employee/${id}`, {
        headers: {
            "Authorization": httpConstants.JWT
        }
    })
}

export const attemptLogin = (data) => {
    return axios.post(`${httpConstants.backEndDevURL}/loginService/login`, data, {
    } )
}
