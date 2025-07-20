import { getAllBlogsInDb } from "@/lib/db/blog";
import Blogs from "@/components/blogs";
import { Suspense } from "react";


export default async function Home() {

  console.log('Home is rendered--------------------------------------------------------')

  const blogs = getAllBlogsInDb()

  return (  
    <div className='p-4 sm:p-6 md:p-10 flex justify-center'>
      <Suspense fallback={<div className="h-[92vh] flex justify-center items-center text-green-900">Loading blogs...</div>}>
        <Blogs blogs={blogs} />
      </Suspense>
    </div>
  );
}
