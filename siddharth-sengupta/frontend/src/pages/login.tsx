import LoginCard from "../components/LoginCard"
import AppBar from "../components/AppBar"


export const Login =()=>{
    return <div className='flex items-center justify-center h-screen'>
      <AppBar/>
      <div className="mt-20">
        <LoginCard/>
    </div>
    
  </div>
}