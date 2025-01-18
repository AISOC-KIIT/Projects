import { Link } from "react-router-dom";

interface BlogCardProps{
    id: number,
    authorName: string,
    title: string,
    briefContent: string,
    publishedDate : string,
    readingTime: number
}
const BlogCard = ({id, authorName,title,briefContent,publishedDate,readingTime}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className=" w-11/12 md:w-4/5 lg:w-3/4">
        <div className="text-white bg-blogGray-500 hover:bg-neutral-800 cursor-pointer p-3 rounded-lg flex flex-col  justify-center space-y-1 ">
        <div className="text-normal  md:text-xl lg:text-2xl font-bold">
            {title}
        </div>
        <div className="flex text-gray-300 font-thin">
            
            <div className="text-sm flex justify-center gap-x-2 break-words">
            <div>
                <Avatar name={authorName}/>
            </div>
                <div>  {authorName}</div>
                <VerticalDivider/>
                <div>{publishedDate}</div>
            </div>
        </div>
        <div className="text-base md:text-lg font-light break-words">
            {briefContent}
        </div>
        <div className="text-sm text-gray-300 font-thin">
            {readingTime} min read
        </div>
    </div>
    </Link>
    
  )
}

function Avatar({name}: {name: string}){
    const arr:string[] = name.split(" ");
    let avatarName:string = arr[0][0] ;
    if(arr.length>1){
        avatarName += arr[arr.length-1][0];
    }
    
    return <div className="text-xs relative inline-flex items-center  justify-center w-6 h-6 overflow-hidden rounded-full bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{avatarName}</span>
</div>
}

function VerticalDivider(){
    return <div className="inline-block h-[20px] min-h-[1em] rounded-md w-0.5 self-stretch  bg-gray-600"></div>
}

export default BlogCard
