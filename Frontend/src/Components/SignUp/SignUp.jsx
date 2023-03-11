import React, { useState } from 'react'
import Elipse from '../../assets/Ellipse31.png'
import dots from '../../assets/Group 695.png'
import Elipse2 from '../../assets/Ellipse 32.png'
import './SignUp.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault()
    const userData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }

    console.log(userData)

    axios.post('http://localhost:3001/signup', userData)
      .then((res) => {
        setMessage(res.data.message)
        navigate('/')
      })
      .catch((err) => {
        setMessage(err.response.data.message)
      })
  }


  useEffect(() => {
    setTimeout(() => {
      setMessage('')
    }, 6000)

  }, [message])


  return (
    <div>
      <div className="login">
        <div className="Elipse31"><img src={Elipse} alt="Elipse31 Err" /></div>
        <div className="Elipse32"><img src={Elipse2} alt="Elipse32 Err" /></div>
        <div className="logincard">
        </div>
        <div className="groupOfDots">
          <img src={dots} alt="" />
        </div>
        <div className="groupOfDots2">
          <img src={dots} alt="" />
        </div>
        <div className="logo">LOGO</div>
        <p className="para">Enter your credentials to access your account</p>
        <form action="" className="login-form">
          <div className="inputs">
            <input type="email" name="" id="" className="username" placeholder='Mail ID' onChange={(e) => { setEmail(e.target.value) }} /><br />
            <input type="password" name="" id="" className="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
            <input type="password" name="" id="" className="Confirm-password" placeholder='Confirm Password' onChange={(e) => { setConfirmPassword(e.target.value) }} />
          </div>
          <button className='signup-btn' onClick={handleSubmit}>Sign Up</button>
          <a href='/' className='signupLink'>Sign In</a>
        </form>
        {message !== '' && <div className='message'>{message}</div>}
      </div>
    </div>
  )
}

export default Signup

