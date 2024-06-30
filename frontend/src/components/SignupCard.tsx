import React, { useEffect, useState } from 'react';
// import CardHeading from './CardHeading';
import { useNavigate } from 'react-router-dom';
import InputField from './InputFIeld';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { signupSchema } from '@sid-sg/blonote-common';
import { BACKEND_URL } from '../config';

type Errors = {
    name?: string;
    email?: string;
    plainPassword?: string;
    other?: string;
};

type ServerError = {
    path: string[];
    message: string;
    code: string;
};

const SignupCard = () => {

  const [postInputs, setPostInputs] = useState<signupSchema>({
    name: "",
    email: "",
    plainPassword: ""
  });
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
      console.log('response:', res.data);
      localStorage.setItem("token",res.data.token);
      
      navigate('/dashboard');
    } 
    catch (error) {

      console.log(error);
      if (axios.isAxiosError(error) && error.response && error.response.status === 400 && error.response.data.message){ //zod error
        console.log("zod error");
        
        // const newErrors: Errors = {};
        // (error.response.data.message.issues as ServerError[]).forEach((err: ServerError) => {
        //     if(err.message){
        //         newErrors[err.path[0]] = err.message;
        //     }
        //     else{
        //         newErrors[err.path[0]] = err.code;
        //     }
          
        // });
        // console.log(newErrors);
        
        // setErrors(newErrors);

      } 
      else if(axios.isAxiosError(error) && error.response){ //user exists error
        setErrors({
          "other": error.response.data.message
        })
        console.log(errors.other);
        console.error('error:', error);
      }
      else{ //server error
        setErrors({
          "other": "Server Error"
        })
        console.error('error:', error);
      }
    }
  };

  return (
    <div className='bg-blogGray-500 rounded text-white flex flex-col pt-2 pb-3 px-4 w-64 md:w-80 lg:w-96'>
      {/* <CardHeading label='Sign Up' /> */}
      <h1 className='text-center text-lg'>Sign up</h1>
      {/* <CardSubHeading label='Enter your information' /> */}
      <form onSubmit={handleSubmit}>
        <InputField
          type='text'
          label='Name'
          placeholder='John Doe'
          value={postInputs.name}
          onChange={(e) => {
            setPostInputs({
                ...postInputs,
                name: e.target.value
            })
          }}
          error={errors.name}
        />
        <InputField
          type='email'
          label='Email'
          placeholder='johndoe@gmail.com'
          value={postInputs.email}
          onChange={(e) => {
            setPostInputs({
                ...postInputs,
                email: e.target.value
            })
          }}
          error={errors.email}
        />
        <InputField
          type='password'
          label='Password'
          placeholder='•••••••••'
          value={postInputs.plainPassword}
          onChange={(e) => {
            setPostInputs({
                ...postInputs,
                plainPassword: e.target.value
            })
          }}
          error={errors.plainPassword}
        />
        <div className='flex justify-center'>
          <button
            type='submit'
            className='text-black bg-white hover:bg-slate-200 focus:ring-4 focus:ring-slate-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            Sign Up
          </button>
        </div>
        <div className='text-white mt-2 text-sm text-center'>
          <p >
            Already have an account?{' '}
            <span className='underline'>
              <Link to='/login'>Log in</Link>
            </span>
          </p>
        </div>

        <div className="text-sm min-h-0" >
          {errors.other?<p className="text-red-500 text-center font-bold">{errors.other}</p> : <p className="invisible">Error placeholder</p>}
        </div>
        
      </form>
    </div>
  );
};

export default SignupCard;