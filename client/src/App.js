import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthComponent from './components/Auth/Auth'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'


const App = () => {

  return (
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthComponent />}/>
            <Route path="/" element={<ProtectedRoute/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Router>
  )
}

export default App
