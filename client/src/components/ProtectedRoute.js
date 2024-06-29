import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import TaskList from './Tasks/TaskList'
import AuthComponent from './Auth/Auth'


const ProtectedRoute = ({component}) => {
  const { user } = useContext(AuthContext)

  return (
    <div>
      {user?<TaskList/>:<AuthComponent/>}
    </div>
  )
}

export default ProtectedRoute
