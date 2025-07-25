"use client"

import { updateBlogLikesCount } from "@/lib/actions/update-blog-likes-count"
import { Button } from "./ui/button"

export default function ClapHands({ count,slug } : { count : number,slug : string}) {

    const handleClapClick = async () => {
        const response = await updateBlogLikesCount(slug)

        if(!response.success) {
            console.log('Failed to clap the blog')
        }

        console.log('Successfully clapped the blog')
    }
    
    return (
        <Button variant="ghost" style={{ cursor : "pointer"}} className="flex gap-1 mt-3" onClick={handleClapClick}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 64 64" aria-hidden="true" role="img" className="size-6 iconify iconify--emojione-monotone " preserveAspectRatio="xMidYMid meet"><path d="M54.255 25.75c-2.854-1.952-4.644-4.562-6.075-8.581c-.532-1.494-1.859-2.46-3.381-2.46c-1.636 0-3.132 1.055-4.104 2.894a8.582 8.582 0 0 0-.986 3.28c-1.008-1.838-3.056-2.229-4.027-.922c0 0-7.986-6.071-10.71-8.004c-3.62-2.566-8.415.276-8.295 3.211c-4.571-2.478-9.589 1.897-8.043 6.482c-1.768-.324-6.29 4.363-1.536 7.963c-3.293.338-4.572 5.494-.745 7.841c0 0 .018.713.069 1.063c-2.522.766-3.392 5.534-.953 7.039c0 0 17.59 11.232 23.645 14.611c3.29 1.836 8.955 2.557 14.002.918c4.901-.508 9.059-3.106 12.4-7.736c9.195-12.742 1.911-25.429-1.261-27.599m-1.077 26.357c-3.829 5.38-9.328 5.938-13.536 5.938c-6.869 0-11.065-3.293-11.065-3.293L9.725 40.676c-3.569-2.464-1.42-6.39 1.084-6.318l14.997 10.219l1.846.115S14.257 35.076 9.92 31.691c-2.532-1.976-1.7-5.75 1.578-6.5l18.756 13.464l1.844.115l-20.035-15.538c-4.233-3.094.015-8.928 4.119-5.957c4.733 3.426 18.972 14.285 18.972 14.285l1.846.116l-18.745-15.527c-.162-2.396 3.025-4.479 5.573-2.573c5.124 3.833 20.504 15.32 20.504 15.32c-.396-1.109-.594-1.943-.594-1.943s-2.922-4.858-1.339-8.395c1.39-3.102 4.202-2.598 4.769-.931c1.507 4.438 3.068 7.072 6.191 9.292c3.988 2.835 8.066 13.605-.181 25.188" fill="#000000"/><path d="M46.041 2.889L37.431 2l2.938 12.26z" fill="#000000"/><path d="M53.165 5.264L48.79 15.457l10.205-2.734z" fill="#000000"/><path d="M29.111 3.549l-6.21 5.133l8.944 5.828z" fill="#000000"/></svg>
            <span className="ml-1">{count}</span>
        </Button>
    )
}   