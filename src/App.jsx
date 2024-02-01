import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import Room from './pages/Room'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { AuthPovider } from './utils/AuthContext'
import RegisterPage from './pages/RegisterPage'

function App() {
  

  return (
    <Router>
      <AuthPovider>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
    <Route element={<ProtectedRoute/>}>
    <Route path='/' element={<Room/>}/> 
    </Route>
     
    </Routes>
    </AuthPovider>
    </Router>
  )
}

export default App
