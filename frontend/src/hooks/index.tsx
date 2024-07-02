import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react"

interface BlogType{
    id: number,
    title: string,
    content: string,
    publishedDate: string,
    author: {
        name: string
    }
}

const useBlogs = () => {
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

export default useBlogs