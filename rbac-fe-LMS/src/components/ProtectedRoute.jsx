import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ component: Component, allowedRoles }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login"></Navigate>
    }

    if (!allowedRoles.includes(user.role)) {
        return <div>Access Denied</div>
    }

    return <Component />
}

export default ProtectedRoute