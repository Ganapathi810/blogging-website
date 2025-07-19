"use client"

import StarterKit from "@tiptap/starter-kit"
import { Editor } from "@tiptap/react";
import { openSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function TiptapContentToText({ content } : { content : string }){
    const [textContent,setTextContent] = useState("")

    useEffect(() => {
        const editor = new Editor({
            extensions : [StarterKit],
            content : JSON.parse(content)
        })
    
        const textContent = editor.getText()
        
        setTextContent(textContent)

        return () => {
            editor.destroy()
        }
    },[content])
    

    return (
        <h3 className={cn(openSans.className,"line-clamp-3 mt-1 text-gray-800 text-wrap")}>{textContent}</h3>
    )
}