import React, { useState } from 'react'
import styles from "./auth.module.css";
import {BiLogIn} from "react-icons/bi"
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginEmployee, validateEmail } from '../../redux/features/employee/employeeAuthServices';
import { toast } from 'react-toastify';
import { SET_EMPLOYEE_LOGIN, SET_EMPLOYEE_NAME } from '../../redux/features/employee/employeeAuthSlice';
import Loader from '../../components/loader/Loader';

 
const initialState = {
  email: '',
  password: '',
} 

const EmployeeLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const {email,password} = formData

  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const login = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      return toast.error("All fields are required")
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email")
    }

    const employeeData = {
      email,
      password
    }
    setIsLoading(true)

    try {
      const data = await loginEmployee(employeeData)
      toast.success("Employee - Logged In Successfully")
      await dispatch(SET_EMPLOYEE_LOGIN(true))
      await dispatch(SET_EMPLOYEE_NAME(data.first_name + " " + data.last_name))
      navigate("/")
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false) 
      toast.error(error.message)
    }
  }

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader/>}
        <Card>
          <div className={styles.form}>
            <div className='--flex-center'>
              <BiLogIn size = {35} color = '#999'/>
            </div>
            <h2>Employee Login</h2>

              <form onSubmit={login}>
                <input type="email" placeholder="Email" required name = "email" value={email} onChange = {handleInputChange}/>
                <input type="password" placeholder="Password" required name = "password" value={password} onChange = {handleInputChange}/>
                <button type="submit" className = "--btn --btn-primary --btn-block">Login</button>
              </form>

              <Link to="/employeeforgot">Forgot Password</Link>

              <span className={styles.register}>
                <Link to = "/">Home</Link> 
                {/* <p> &nbsp; Don't have an account? &nbsp;</p>
                <Link to = "/register">Register</Link> */}
              </span>
          </div>
        </Card>
    </div>
  )
} 

export default EmployeeLogin;