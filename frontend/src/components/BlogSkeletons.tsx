const BlogSkeletons = () => {
    return (
      <div role="status" className="w-11/12 md:w-4/5 lg:w-3/4 animate-pulse h-[33vh]">
          <div className="h-full  bg-blogGray-500  p-3 rounded-lg flex flex-col  justify-center ">
              <div className="h-6 rounded-full bg-gray-400 max-w-[1000px] mb-2"></div>
              <div className="h-6 rounded-full bg-gray-400 max-w-[1000px] mb-5"></div>
              <div className="flex mb-5">  
                  <div className="flex justify-center items-center gap-x-2">
                      <div className="flex justify-center items-center">
                          <Avatar/>
                      </div>
                      <div className="h-5 w-16 rounded-full  bg-gray-500  "></div>
                      <div className="h-5 w-16 rounded-full  bg-gray-500  "></div>
                  </div>
              </div>
              <div className="h-4 rounded-full bg-gray-500 max-w-[1000px] mb-2.5"></div>
              <div className="h-4 rounded-full bg-gray-500 max-w-[1000px] mb-2.5"></div>
          </div>
      </div>
    )
  }
  
  function Avatar(){
      return <div className="text-xs relative inline-flex items-center justify-center w-6 h-6 overflow-hidden rounded-full bg-gray-500">
      </div>
  }


  
  export default BlogSkeletons
  