import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom'
import AuthComponent from './components/Auth/Auth'
import ProtectedRoute from './components/ProtectedRoute'
import React,{useContext} from 'react'
import AuthContext from './context/AuthContext'

const App = () => {

  const {user } = useContext(AuthContext)
  console.log(user)
  return (
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthComponent />} />
            <Route
              path="/"
              element={<ProtectedRoute/>}
            />
          </Routes>
        </Router>
  )
}

export default App
