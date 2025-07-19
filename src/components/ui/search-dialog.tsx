"use client"

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"

export default function SearchDialog({ open, setOpen } : { open : boolean, setOpen : (open : boolean) => void}) {
    const [blogs,setBlogs] = useState<any[]>([])
    const [query,setQuery] = useState('')
    const router = useRouter()

    useEffect(() => {
        if(query.length > 1) {
            fetch(`/api/blog/search?q=${encodeURIComponent(query)}`)
                .then(async (res) => {
                    const result = await res.json()
                    setBlogs(result)
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
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
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