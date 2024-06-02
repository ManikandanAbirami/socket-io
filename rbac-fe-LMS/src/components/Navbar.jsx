import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    return (
        <nav>
            <ul>
                <li><Link to="/admin">Admin</Link></li>
                <li><Link to="/editor">Editor</Link></li>
                <li><Link to="/viewer">Viewer</Link></li>
                {user ?
                    (<li><button onClick={logout}>Sign Out</button></li>)
                    : (<li><Link to="/login">Login</Link></li>)
                }
            </ul>
        </nav>
    )
}

export default Navbar