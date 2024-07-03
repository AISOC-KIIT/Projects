import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react"

interface BlogType{
    id: number,
    title: string,
    briefContent: string,
    content: string,
    readingTime: number,
    publishedDate: string,
    author: {
        name: string
    }
}

 export const useBlog = (id: number) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlogs] = useState<BlogType>();

    useEffect(()=>{
        const fetchBlogs = async()=>{
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`);
            console.log(res);
            
            setBlogs(res.data.foundBlog);
            setLoading(false);
        }
        fetchBlogs();
    },[]);
  return {
    loading,
    blog
  }
}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [Blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(()=>{
        const fetchBlogs = async()=>{
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`);
            console.log(res);
            
            setBlogs(res.data.foundBlog);
            setLoading(false);
        }
        fetchBlogs();
    },[]);
  return {
    loading,
    Blogs
  }
}

