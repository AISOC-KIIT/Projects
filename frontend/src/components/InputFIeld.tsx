import { ChangeEvent, useState } from 'react';

interface inputType {
    type: string,
    label: string,
    placeholder: string,
    value: string,
    onChange:  (e: ChangeEvent<HTMLInputElement>) => void,
    error: any
}

const InputField = ({ type, label, placeholder, value, onChange, error }: inputType ) => {
  const [visible,setVisible] = useState(false);
  const handleToggle =()=>{
    setVisible(!visible);
  }
  

  return <div className='mb-2'>
    <label className='block text-sm font-medium text-gray-300'>{label}</label>

    <div className='relative'>
    <input type={visible ? 'text' : type} placeholder={placeholder} value={value} onChange={onChange} className={`mt-1 w-full p-2.5 bg-blogBlack-500 border ${
        error ? 'border-red-500' : 'border-gray-700'
      } rounded-lg focus:ring-blue-500 focus:border-blue-500`}/>
    {type === 'password' && (
          <span
            className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer'
            onClick={handleToggle}
          >
            {visible? (<Eye/>):(<EyeSlash/>)}
          </span>
     )}
    </div>
    
    
    <div className="text-sm min-h-0" >
        {error ? <p className="text-red-500">{error}</p> : <p className="invisible">Error placeholder</p>}
    </div>
  </div>
};

export default InputField;


function Eye(){
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>

}

function EyeSlash(){
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
         </svg>

}