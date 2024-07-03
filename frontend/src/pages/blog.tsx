import { useState } from "react";
import AppBar from "../components/AppBar"
import { useParams } from "react-router-dom";
import Viewer from "../components/Viewer";
import { useBlog } from "../hooks";

interface storageStringType{
    title: string,
    blocknoteContent: string
}
export const Blog = ()=>{
    const {id} = useParams();
    // const ID: number = parseInt(id ?? "0");
    const {loading,blog} = useBlog(parseInt(id ?? "5") ); 

    // console.log(blog?.content);
    // console.log(blog?.author);
    
    
    if(loading){
        return <div className="text-white">
            loading......
        </div>
    }


    return <>
        <AppBar/>
        <div className="m-3  md:10 lg:m-20">
            <div className="mt-20 text-white text-5xl">
                {blog?.title}
            </div>
            <div className="mt-10 text-white text-2xl">
                {blog?.author.name}  |  {blog?.publishedDate}
            </div>
            <div className="mt-5 text-white text-xl">
                {blog?.readingTime} min read
            </div>

            <div className="mt-5">
                <Viewer content={(blog?.content) || " "}/>
            </div>
            
        </div>
        
        

    </>
}