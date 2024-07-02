import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import useBlogs from "../hooks"


export const HomeBlogs = () => {

    const {loading, Blogs} = useBlogs();
    console.log(loading);
    
    console.log(Blogs);
    
    if(loading){
        return <div className="text-white">
            loading......
        </div>
    }

  return (
    <div>
      <AppBar/>

      <div className="flex flex-col justify-center items-center gap-y-3 mt-20">
      {Blogs.map(b=>{
        return <BlogCard key={b.id} authorName={b.author.name} title={b.title} content={b.content} 
        publishedDate={b.publishedDate} readingTime="1"/>
      })}
        
      </div>

    </div>
  )
}

