import React, { useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, error } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    login(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div className='auth-form'>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error.login}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
