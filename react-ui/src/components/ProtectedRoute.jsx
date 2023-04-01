import { Navigate } from 'react-router-dom'
import React from 'react'
import { isAuthenticated } from '../utils/helpers'


const ProtectedRoute = ({ children}) => {
    if (isAuthenticated()) {
        return children
    } else {
        return <Navigate to="/" replace/>
    } 
}

export default ProtectedRoute