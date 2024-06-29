import React, { useContext} from 'react'
import AuthContext from '../context/AuthContext'
import TaskList from './Tasks/TaskList'
import AuthComponent from './Auth/Auth'


const ProtectedRoute = ({component}) => {
  const { user,logout } = useContext(AuthContext)

  return (
    <div>
      {user&&<nav>
        <span>Hello {user.name} </span>
        <button id="logout-btn" onClick={()=>logout()}>Logout</button>
      </nav>}
      {user?(<TaskList/>):<AuthComponent/>}
    </div>
  )
}

export default ProtectedRoute
