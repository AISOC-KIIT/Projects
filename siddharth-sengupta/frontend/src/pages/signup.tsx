import SignupCard from "../components/SignupCard"
import AppBar from "../components/AppBar"

export const Signup =()=>{
    return <div className='flex items-center justify-center h-screen'>
    <AppBar/>
    <div className="mt-20">
      <SignupCard/>
    </div>
    
    
  </div>
}