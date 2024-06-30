import { useEffect, useState } from 'react';
// import CardHeading from './CardHeading';
import { useNavigate } from 'react-router-dom';
import InputField from './InputFIeld';
import { Link } from 'react-router-dom';
import axios from 'axios';

type Errors = {
    email?: string;
    plainPassword?: string;
    other?: string;
  };

const LoginCard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [plainPassword, setPlainPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     try {
//       const res = await axios.post('http://localhost:3000/api/v1/user/signup', {
//         email,
//         name,
//         plainPassword,
//       });
//       console.log('response:', res.data);
//       localStorage.setItem("token",res.data.token);
      
//       navigate('/dashboard');
//     } 
//     catch (error) {
//       console.log(error);
//       if (error.response && error.response.status === 400 && error.response.data.errors){ //zod error
//         const newErrors = {};
//         error.response.data.errors.forEach(err => {
//           newErrors[err.field] = err.message;
//         });
//         setErrors(newErrors);
//       } 
//       else if(error.response){ //user exists error
//         setErrors({
//           "other": error.response.data.message
//         })
//         console.log(errors.other);
//         console.error('error:', error);
//       }
//       else{ //server error
//         setErrors({
//           "other": "Server Error"
//         })
//         console.error('error:', error);
//       }
//     }
//   };

  return (
    <div className='bg-blogGray-500 rounded text-white flex flex-col pt-2 pb-3 px-4 w-64 md:w-80 lg:w-96'>
      {/* <CardHeading label='Sign Up' /> */}
      <h1 className='text-center text-lg'>Log in</h1>
      {/* <CardSubHeading label='Enter your information' /> */}
      <form >
        <InputField
          type='email'
          label='Email'
          placeholder='johndoe@gmail.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <InputField
          type='password'
          label='Password'
          placeholder='•••••••••'
          value={plainPassword}
          onChange={(e) => setPlainPassword(e.target.value)}
          error={errors.plainPassword}
        />
        <div className='flex justify-center'>
          <button
            type='submit'
            className='text-black bg-white hover:bg-slate-200 focus:ring-4 focus:ring-slate-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            Log in
          </button>
        </div>

        <div className="text-sm min-h-0" >
          {errors.other?<p className="text-red-500 text-center font-bold">{errors.other}</p> : <p className="invisible">Error placeholder</p>}
        </div>
        
      </form>
    </div>
  );
};

export default LoginCard;