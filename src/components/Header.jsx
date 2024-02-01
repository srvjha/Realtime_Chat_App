import React from 'react'
import {LogOut} from 'react-feather'
import { useAuth } from '../utils/AuthContext'

const Header = () => {
    const{user,handleUserLogout} = useAuth()
  return (
    <div id='header--wrapper'>
        {user?(
            <>
           <h1 className=' text-2xl '>{` Welcome "${user.name}"`}</h1>
            <LogOut
            onClick={handleUserLogout}
            className='header--link'/>
            </>
        ):(
            <button>
                Login
            </button>
        )}

    </div>
  )
}

export default Header