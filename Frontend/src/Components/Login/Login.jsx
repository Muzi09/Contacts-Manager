import React, { useState } from 'react'
import './Login.css'
import Elipse from '../../assets/Ellipse31.png'
import dots from '../../assets/Group 695.png'
import Elipse2 from '../../assets/Ellipse 32.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const userInfo = {
      email: email,
      password: password
    }

    axios.post('http://localhost:3001/login', userInfo)
    .then((res) => {
      setMessage(res.data)
      localStorage.setItem('token', res.data.token)
      navigate('/contactpage')
    })
    .catch((err) => {
      setMessage(err.response.data.message)
    })
  }


  useEffect(() => {
    setTimeout(() => {
      setMessage('')
    }, 5000)

  }, [message])


  return (
    <>
    <div className="login">
      <div className="Elipse31"><img src={Elipse} alt="ellipse" /></div>
      <div className="Elipse32"><img src={Elipse2} alt="" /></div>
      <div className="logincard">
      </div>
      <div className="groupOfDots">
        <img src={dots} alt="" />
      </div>
      <div className="groupOfDots2">
        <img src={dots} alt="" />
      </div>
      <div className="logo">LOGO</div>
      <p className='para'>Enter your credentials to access your account.</p>
        <form action="" className="login-form">
          <div className="inputs">
            <input type="email" name="" id="" className="username" placeholder='Mail ID' onChange={(e) => {setEmail(e.target.value)}}/><br />
            <input type="password" name="" id="" className="password" placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}/>
          </div>
          <button className='signup-btn' onClick={handleSubmit}>Sign In</button>
          <a href="/signup" className='signupLink'>Sign Up</a>
        </form>
        {message !== '' && <div className='message'>{message}</div>}
    </div>
    </>
  )
}

export default Login