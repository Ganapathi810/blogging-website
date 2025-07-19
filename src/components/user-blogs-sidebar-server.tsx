import { auth } from "@/lib/auth";
import { UserBlogsInSidebar } from "./sidebar-user-blogs";
import { getAllBlogsOfUser } from "@/lib/db/blog";

export async function UserBlogsInSidebarServer() {
    const session = await auth()
    const allBlogsOfUser = await getAllBlogsOfUser(Number(session?.user?.id))

    return (
        <UserBlogsInSidebar allBlogsOfUser={allBlogsOfUser}/>
    )
}