"use client"

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Blog } from "@prisma/client"
import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"

export default function SearchDialog({ open, setOpen } : { open : boolean, setOpen : (open : boolean) => void}) {
    const [blogs,setBlogs] = useState<Blog[]>([])
    const [query,setQuery] = useState('')
    const router = useRouter()
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        if(query.length > 0) {
            fetch(`/api/blog/search?query=${encodeURIComponent(query)}`)
                .then(async (res) => {
                    const result = await res.json()
                    setBlogs(result)
                    setLoading(false)
                })
                .catch((error) => {
                    console.log('Failed to search blogs : '+error)
                    setLoading(false)
                })
        } else {
            setBlogs([])
        }
    },[query])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen(true)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search blog..." onValueChange={(value) => setQuery(value)} />
            {loading && <div className="w-full flex justify-center p-3"><LoaderCircle className="h-7 w-7 stroke-green-500 animate-spin" /></div>}
            <CommandList>
                {!loading && <CommandEmpty>No results found.</CommandEmpty>}
                {blogs.map((blog) => (
                    <CommandItem
                        key={blog.id}
                        onSelect={() => {
                            router.push(`/blogs/${blog.slug}`)
                            setOpen(false)
                        }}
                        className="hover:bg-green-500"
                    >
                        {blog.title}
                    </CommandItem>

                ))}
            </CommandList>
        </CommandDialog>
    )
}