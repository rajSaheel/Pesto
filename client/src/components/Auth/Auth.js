import React from 'react'
import Login from './Login'
import Register from './Register'

const AuthComponent = () => {
    return (
        <div className='auth-container container'>
            <Login />
            <Register />
        </div>
    )
}

export default AuthComponent
