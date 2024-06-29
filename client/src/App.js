import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthComponent from './components/Auth/Auth'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {

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
