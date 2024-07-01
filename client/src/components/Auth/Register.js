import React, { useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState(null)
  const { register, error } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('name', name)
    formData.append('avatar', avatar)
    register(formData)
  }

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error.register}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label htmlFor="avatar">Avatar:</label>
          <input type='file' name="avatar" accept='image/*' onChange={(e) => setAvatar(e.target.files[0])} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
