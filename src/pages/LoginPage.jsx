import React,{useEffect, useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import {ID} from 'appwrite'



const LoginPage = () => {
  const {user,handleUserLogin} =useAuth()
  const navigate = useNavigate()
  const id= ID.unique()
  
  const[credentials,setCredentials] = useState({
    email:'',
    password:''
  })
  useEffect(()=>{
    if(user)
    {
      navigate("/")
    }
  },[])
  
  const handleInput = (e) =>{
     let name=e.target.name
      let value=e.target.value

      setCredentials({...credentials,[name]:value})
    
  }
 
  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
        <form onSubmit={(e)=>handleUserLogin(e,credentials)}>
          
         <div className='field--wrapper'>
          <label htmlFor={id}>
            Email:
          </label>
          <input
           type="email"
           required
           placeholder='Enter your Email...'
           name='email'
           value={credentials.email}
           onChange={handleInput}
            />
         </div>

         <div className='field--wrapper'>
          <label htmlFor={id}>
            Password:
          </label>
          <input
           type="password"
           required
           placeholder='Enter your Password...'
           name='password'
           value={credentials.password}
           onChange={handleInput}
            />
         </div>

         <div className='field--wrapper'>
         <input className='btn btn--lg btn--main' type='submit' value='LOGIN'/>
         </div>
        </form>
        <p>Don't have an account? Register <Link to="/register">Here</Link> </p>
       
      </div>
    </div>
  )
}

export default LoginPage