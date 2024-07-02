import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import TaskList from './Tasks/TaskList'
import AuthComponent from './Auth/Auth'
import avatar from '../avatar.png'
import TaskNotification from './Tasks/TaskNotification'

const ProtectedRoute = ({ component }) => {
  const { user, logout } = useContext(AuthContext)

  return (
    <div className='main'>
      {user && <nav className='navbar'>
        <span>Hello {user.name} </span>
        <img src={user.avatar ? `${process.env.REACT_APP_AVATAR_URL}${user.avatar}` : avatar} className='avatar' alt="avatar" />
        <button id="logout-btn" onClick={() => logout()}>Logout</button>
      </nav>}
      <div className='content'>
        <TaskNotification />
        {user ? (<TaskList />) : <AuthComponent />}
      </div>

    </div>
  )
}

export default ProtectedRoute
