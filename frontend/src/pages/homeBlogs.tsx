import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import BlogSkeletons from "../components/BlogSkeletons";
import {useBlogs} from "../hooks"


export const HomeBlogs = () => {

    const {loading, Blogs} = useBlogs();
    // console.log(loading);
    
    // console.log(Blogs);
    
    if(loading){
        return <div className="flex flex-col justify-center items-center gap-y-3 mt-20  ">
                  {/* <div className=" flex flex-col w-11/12 md:w-4/5 lg:w-3/4 gap-y-3">  */}
                    <BlogSkeletons />
                    <BlogSkeletons />
                    <BlogSkeletons />
                  {/* </div> */}
                </div>
    }

    function niceDate(date: string): string{
      const [day, month, year] = date.split("-");
      const newDay:string = parseInt(day).toString();
      const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const newMonth = monthNames[parseInt(month) - 1];

      return `${newMonth} ${newDay}, ${year}`;
    }

  return (
    <div>
      <AppBar/>

      <div className="flex flex-col justify-center items-center gap-y-3 mt-20">
      {Blogs.map(b=>{
        return <BlogCard  key={b.id} id={b.id} authorName={b.author.name} title={b.title} briefContent={b.briefContent} 
        publishedDate={niceDate(b.publishedDate)} readingTime={b.readingTime}/>
      })}
        
      </div>

    </div>
  )
}

