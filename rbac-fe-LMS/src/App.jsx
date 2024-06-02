import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext, AuthProvider } from './context/AuthContext'
import AdminPage from './components/AdminPage'
import EditorPage from './components/EditorPage'
import ViewerPage from './components/ViewerPage'
import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage'
import withRole from './components/withRole'
import ProtectedRoute from './components/ProtectedRoute'
import AddBookPage from './components/AddBookPage'

function App() {
  const { user, login } = useContext(AuthContext);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const role = localStorage.getItem('role');
  //   if (token && role) {
  //     login({ token, role });
  //   }
  // }, [login]);

  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<AddBookPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/admin' element={<ProtectedRoute component={AdminPage} allowedRoles={['Admin']} />}></Route>
        <Route path='/editor' element={<ProtectedRoute component={EditorPage} allowedRoles={['Editor']} />}></Route>
        <Route path='/viewer' element={<ProtectedRoute component={ViewerPage} allowedRoles={['Viewer']} />}></Route>
        {/* <Route path='/' element={<Navigate to={user ? "/viewer" : "/login"}></Navigate>}></Route> */}
      </Routes>
    </Router>
  )
}

export default App
