import { createContext,useState , useEffect, useContext} from "react";
import authService from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthPovider = ({ children })=>{
    const[loading,setLoading] = useState(true)
    const[user,setUser] = useState(false)
    const navigate = useNavigate()
    
    useEffect(()=>{
      handleLoad()
    },[])

    const handleLoad = async()=>{
        try {
            const userData = await authService.getCurrentUser()
            setUser(userData)
        } catch (error) {
            console.error(error)
        }
       
        setLoading(false)
    }

    const handleUserLogin = async(e,credentials) =>{
         e.preventDefault()        
        try {
            let loginSession = await authService.login(credentials.email,credentials.password)    
            console.log("Logged In ",loginSession)
            let userData = await authService.getCurrentUser()
            setUser(userData)
              //console.log(userData)
            navigate("/")
        } catch (error) {
           console.error(error)
        }
    }

    const handleUserLogout = async()=>{
        await authService.logout()
        setUser(null)
    }

    const handleUserRegister = async(e,credentials)=>{
        e.preventDefault();
        if(credentials.password1!==credentials.password2)
        {
            alert("Password Do Not Match! - Please Enter Again")
            return
        }
       
        try {
         const registerSession = await authService.createAccount(credentials.email,credentials.password1,credentials.name)
         console.log("Registered ",registerSession)
         let userData = await authService.getCurrentUser()
         setUser(userData)
         navigate("/")

        } catch (error) {
            console.error(error)
        }
    }

    const contextData = {
       user,
       handleUserLogin,
       handleUserLogout,
       handleUserRegister
     
    }

       return <AuthContext.Provider value={contextData}>
        {loading?<p>Loading...</p>:children}
        </AuthContext.Provider>
}
// Creating our Custom Hook

export const useAuth = () =>{return useContext(AuthContext)}
export default AuthContext