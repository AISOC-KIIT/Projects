import { useState } from "react"
import AppBar from "../components/AppBar"
import Editor from "../components/Editor"
import ReactTextareaAutosize from "react-textarea-autosize";
const NewBlog = () => {
    const[clearClicked,setClearClicked] = useState(false);
    const [title,setTitle] = useState("");
    
  return (
    
    <div>
        <AppBar/>
        <div className="flex flex-col items-center mt-28">

          <div>
            <ReactTextareaAutosize placeholder="Untitled" onChange={(e)=>{
              setTitle(e.target.value) 
            }} className=" w-11/12  mx-5 text-white text-5xl bg-transparent font-bold break-words outline-none resize-none"/>
          </div>

          <div className="mt-2 w-11/12 md:w-4/5 lg:w-3/4 mx-auto bg-blogGray-500 flex-grow min-h-72">
            <Editor clear={clearClicked} onClear={()=>{
              setClearClicked(false);
            }}/>
          </div>
          <div className="mt-20 mb-20 flex gap-x-5">

              {/* <button className="text-white" onClick={()=>{
                setClearClicked(true);
              }}>clear all</button>

              <button className="text-white">publish</button> */}
              <Button value="Clear All" onClick={()=>{
                setClearClicked(true);
              }}/>
              <Button value="Publish"/>

          </div>

        </div>
        
    </div>
  )
}

function Button({value, onClick}:{value: string, onClick?: ()=>void}){
  return <button onClick={onClick} type='submit' className='text-black bg-white hover:bg-slate-200 focus:ring-4 focus:ring-slate-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
    {value}
  </button>
}

export default NewBlog