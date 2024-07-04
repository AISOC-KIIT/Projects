import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavButtonsType{
    valid: boolean,
    logOut: ()=>void,
    signUp: ()=>void,
    logIn: ()=>void,
    write: ()=>void,
}

const AppBar = () => {
  const navigate = useNavigate();
  const [valid, setValid] =useState<boolean>(false);
  const location = useLocation();
  // const [token, setToken] =useState<string | null>(localStorage.getItem("token"));

  useEffect(()=>{
    async function loggedIn(){
        try{
             await axios.post(`${BACKEND_URL}/api/v1/user/validate`,{}, {
                headers: {
                  "Authorization": "Bearer " + localStorage.getItem("token")
                }
              });
              setValid(true);
        }
        catch(e){
            console.log(e);
            setValid(false); 
        }
        
    }

    if(location.pathname=="/" || location.pathname.startsWith("/blog/") ){
        loggedIn();
    }
  },[]);

  const logOut = ()=>{
    localStorage.removeItem("token");
    navigate("/signup");
  }
  const signUp = ()=>{
    navigate("/signup");
  }
  const logIn = ()=>{
    navigate("/login");
  }
  const write = ()=>{
    navigate("/new-post");
  }
  const home = ()=>{
    navigate("/");
  }

  return (
    <div className='flex justify-between text-white bg-zinc-900 rounded shadow-md shadow-zinc-800 w-full fixed top-0 z-50 bg-opacity-60 backdrop-filter backdrop-blur-lg'>
        <div className=' tracking-widest px-3 py-4 cursor-pointer' onClick={home}> Blonote</div>
            {(location.pathname!=="/signup" && location.pathname!=="/login" && location.pathname!=="/new-post") && <NavButtons valid={valid} logOut={logOut} signUp={signUp} logIn={logIn} write={write} />}
            
         </div>
  );
};

function NavButtons({valid, logOut, signUp, logIn, write}:NavButtonsType){
    if(valid){
        return <div className='px-3 flex items-center gap-x-2'>
            <Button value="Write" onClick={write} icon={<Pen/>}/>
            <Button value="Log Out" onClick={logOut} />
        </div>
    }
    else{
        return <div className='px-3 flex items-center gap-x-2'>
            <Button value="Sign Up" onClick={signUp}/>
            <Button value="Log In" onClick={logIn}/>
        </div>
    }
}

function Button({value, onClick, icon}: {value: string, onClick: ()=>void, icon?: React.ReactNode}){
    return <button
    type='button'
    onClick={onClick}
    className='text-black bg-white hover:bg-slate-200 focus:ring-4 focus:ring-gray-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
    <div className='flex justify-center items-center'>
        {icon && <span>{icon} </span>}
        {value}
    </div>
  </button>
}

function Pen(){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  
}

export default AppBar;