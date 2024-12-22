export default function Stats() {
  return (
    <div className={" flex items-center justify-center min-h screen cursor-pointer  "}>
    <div className="flex flex-wrap gap-5 justify-center"> 

    <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out bg-black text-blue-400  border border-blue-500 p-6 rounded-lg text-center w-64 ">
    <span className="text-3xl font-bold">999</span>
      <p className="text-gray-300 mt-2">Communities</p>
     </div>

     <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out bg-black text-blue-400  border border-blue-500 p-6 rounded-lg text-center w-64">
     <span className="text-3xl font-bold">+9999</span>
     <p className="text-gray-300 mt-2">Active Users</p>
     </div>

     <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out bg-black text-blue-400  border border-blue-500 p-6 rounded-lg text-center w-64">
     <span className="text-3xl font-bold">+9999</span>
     <p className="text-gray-300 mt-2">posts</p>
     </div>
   </div>
   </div>
  )
}
