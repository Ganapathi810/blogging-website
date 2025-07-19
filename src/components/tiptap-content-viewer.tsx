"use client"

import { openSans } from "@/lib/fonts"
import { extentions } from "@/lib/tiptap-extensions"
import { Content, EditorContent } from "@tiptap/react"
import { useEditor } from "@tiptap/react"


export default function TiptapContentViewer({ content } : { content : Content }) {
    
    const editor = useEditor({
        editable : false,
        content : content,
        immediatelyRender : false,
        extensions : extentions,
        editorProps : {
            attributes : {
                class : `min-h-[75vh] p-2 w-full lg:max-w-7xl mt-5 prose max-w-none rounded-lg text-lg ${openSans.className}`
            }
        }
    })

    return (
        <div className="mt-3 mb-8">
            <EditorContent editor={editor} role="presentation"/>
        </div>
    )
}

 