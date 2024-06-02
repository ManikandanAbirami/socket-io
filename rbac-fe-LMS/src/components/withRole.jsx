import React, { useContext } from "react";
import { AuthContext } from '../context/AuthContext';

const withRole = (Component, allowedRoles) => {
    return (props) => {
        const { user } = useContext(AuthContext);
        console.log("User role checking:", user.role);
        if (user && allowedRoles.includes(user.role)) {
            return <Component {...props} />;
        } else {
            return <div>Access Denied</div>
        }
    }
}

export default withRole;