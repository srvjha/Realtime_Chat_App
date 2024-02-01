import React,{useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import {ID} from 'appwrite'
import { Link, useNavigate } from 'react-router-dom'


const RegisterPage = () => {
  const {handleUserRegister} = useAuth()
  const id= ID.unique()
  const navigate = useNavigate()
  const[credentials,setCredentials] = useState({
    email:'',
    password1:'',
    password2:'',
    name:''
  })

  const handleInput = (e) =>{
    let name=e.target.name
     let value=e.target.value

     setCredentials({...credentials,[name]:value})
   
 }
  return (
     <div className='auth--container'>
      <div className='form--wrapper'>
        <form onSubmit={(e)=>handleUserRegister(e,credentials)}>
        <div className='field--wrapper'>
          <label htmlFor={id}>
            Name:
          </label>
          <input
           type="text"
           required
           placeholder='Enter your Name...'
           name='name'
           value={credentials.name}
           onChange={(e) => {handleInput(e)}}
            />
         </div>
          
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
           onChange={(e) => {handleInput(e)}}
            />
         </div>

         <div className='field--wrapper'>
          <label>
            Password:
          </label>
          <input
           type="password"
           required
           placeholder='Enter your Password...'
           name='password1'
           value={credentials.password1}
           onChange={(e) => {handleInput(e)}}
            />
         </div>
         <div className='field--wrapper'>
          <label>
            Confirm Password:
          </label>
          <input
           type="password"
           required
           placeholder='Confirm your Password...'
           name='password2'
           value={credentials.password2}
           onChange={(e) => {handleInput(e)}}
            />
         </div>

         <div className='field--wrapper'>
         <input className='btn btn--lg btn--main' type='submit' value='REGISTER'/>
         </div>
        </form>
        <p>Already have an account? Login <Link to="/login">Here</Link> </p>
       
      </div>
    </div>
  )
}

export default RegisterPage