import AppBar from "../components/AppBar"
import { useParams } from "react-router-dom";
import Viewer from "../components/Viewer";
import { useBlog } from "../hooks";


export const Blog = ()=>{
    const {id} = useParams();
    // const ID: number = parseInt(id ?? "0");
    const {loading,blog} = useBlog(parseInt(id ?? "5") ); 

    // console.log(blog?.content);
    // console.log(blog?.author);
    
    
    if(loading){
        return <div role="status" className="flex justify-center items-center h-screen">
            <div>
            <svg aria-hidden="true" className="inline w-16 h-16 animate-spin text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
            </div>
    </div>
    }

    function niceDate(date: string): string{
        const [day, month, year] = date.split("-");
        const newDay:string = parseInt(day).toString();
        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const newMonth = monthNames[parseInt(month) - 1];
  
        return `${newMonth} ${newDay}, ${year}`;
      }


    return <>
        <AppBar/>
        <div className="m-4  md:10 lg:m-20">
            <div className="mt-20 text-white  text-4xl md:text-6xl lg:text-7xl font-sans font-semibold">
                {blog?.title}
            </div>
            {/* <div className="mt-10 text-gray-300  text-2xl">
                {blog?.author.name}  |  {blog?.publishedDate && niceDate(blog.publishedDate)}
            </div> */}
            <div className="flex text-gray-300 text-2xl mt-10 ">
            
                <div className="flex justify-center gap-x-2 break-words">
                <div className="flex justify-center items-center">
                    <Avatar name={(blog?.author.name)||""}/>
                </div>
                    <div>  {blog?.author.name}</div>
                    <div className="flex justify-center items-center">
                        <VerticalDivider/>
                    </div>
                    <div>{blog?.publishedDate && niceDate(blog.publishedDate)}</div>
                </div>
            </div>
            <div className="mt-5 text-gray-300  text-lg">
                {blog?.readingTime} min read
            </div>

            <div className="mt-5">
                <Viewer content={(blog?.content) || " "}/>
            </div>
            
        </div>
        
        

    </>
}


function Avatar({name}: {name: string}){
    const arr:string[] = name.split(" ");
    let avatarName:string = arr[0][0] ;
    if(arr.length>1){
        avatarName += arr[arr.length-1][0];
    }
    
    return <div className="text-base relative inline-flex items-center  justify-center w-10 h-10 overflow-hidden rounded-full bg-gray-600">
    <span className="text-gray-600 dark:text-gray-300">{avatarName}</span>
</div>
}

function VerticalDivider(){
    return <div className=" h-[30px] min-h-[1em] rounded-md w-0.5 self-stretch  bg-gray-600"></div>
}