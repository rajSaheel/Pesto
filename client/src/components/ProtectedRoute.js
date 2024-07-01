import React, { useContext} from 'react'
import AuthContext from '../context/AuthContext'
import TaskList from './Tasks/TaskList'
import AuthComponent from './Auth/Auth'
import avatar from '../avatar.png'
import TaskNotification from './Tasks/TaskNotification'

const ProtectedRoute = ({component}) => {
  const { user,logout } = useContext(AuthContext)

  return (
    <div>
      {user&&<nav>
        <span>Hello {user.name} </span>
        <img src={user.avatar?`${process.env.REACT_APP_AVATAR_URL}${user.avatar}`:avatar} width="50" height="50" alt="avatar"/>
        <button id="logout-btn" onClick={()=>logout()}>Logout</button>
      </nav>}
      <TaskNotification/>
      {user?(<TaskList/>):<AuthComponent/>}
    </div>
  )
}

export default ProtectedRoute
