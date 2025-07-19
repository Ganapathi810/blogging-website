"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAlertInfoContext } from "@/contexts/alert-info-context";
import { useDeleteBlog } from "@/contexts/delete-blog-context"
import { useLoadingContext } from "@/contexts/loading";
import { deleteBlog } from "@/lib/actions/delete-blog";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GlobalDeleteBlogAlertDialog() {
    const { blogToDelete,setBlogToDelete } = useDeleteBlog()
    const router = useRouter()
    const { setAlertInfo } = useAlertInfoContext()
   
    const { loading,setLoading } = useLoadingContext()

    const handleBlogDelete = async () => {
        if (!blogToDelete) return
    
    setLoading(true)
    
    try {
      const result = await deleteBlog(blogToDelete.slug)
      
      if (result.status === 'success') {
        setAlertInfo({
          status: 'success',
          message: 'Blog deleted successfully'
        })
        router.push('/?status=deleted')
      } else {
        setAlertInfo({
          status: 'error',
          message: 'Failed to delete blog'
        })
        router.push('/?status=error')
      }
    } catch (error) {
        console.log(error)
      setAlertInfo({
        status: 'error',
        message: 'An unexpected error occurred'
      })
      router.push('/?status=error')
    } finally {
      setLoading(false)
      setBlogToDelete(null)
      
      setTimeout(() => setAlertInfo(null), 3000)
    }
    }


    return (
        <AlertDialog open={!!blogToDelete} onOpenChange={(open) => !open && setBlogToDelete(null)}>
            <AlertDialogContent className="z-50">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-wrap">Delete {blogToDelete?.slug} ?</AlertDialogTitle>
                    <AlertDialogDescription>This will delete the blog permanently.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='bg-green-400 hover:bg-green-500 text-white'>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleBlogDelete} className="bg-red-500 hover:bg-red-600 flex gap-2 items-center">
                        {loading && <Loader2 className="animate-spin h-5 w-5 stroke-green-400"/>}
                        {loading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog> 
    )
}