import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import AdminPage from './components/AdminPage'
import EditorPage from './components/EditorPage'
import ViewerPage from './components/ViewerPage'

function App() {
  const withRole = (Component, allowedRoles) => {
    return (props) => {
      const { user } = useContext(AuthContext);
      if (user && allowedRoles.includes(user.role)) {
        return <Component {...props} />;
      } else {
        return <div>Access Denied</div>
      }
    }
  }

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin' element={withRole(AdminPage, ['Admin'])}></Route>
        <Route path='/editor' element={withRole(EditorPage, ['Editor'])}></Route>
        <Route path='/viewer' element={withRole(ViewerPage, ['Viewer'])}></Route>
        <Route path='/' element={<Navigate to="/login"></Navigate>}></Route>
      </Routes>
    </Router>
  )
}

export default App
