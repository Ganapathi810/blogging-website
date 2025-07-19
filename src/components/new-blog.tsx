"use client"

import { EditorContent,EditorContext,useEditor } from "@tiptap/react"
import { HeadingDropdownMenu } from '@/components/tiptap-ui/heading-dropdown-menu'
import { Button } from "@/components/ui/button"
import { ColorHighlightPopover } from "@/components/tiptap-ui/color-highlight-popover"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from '@/components/tiptap-ui/undo-redo-button'
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { extentions } from "@/lib/tiptap-extensions"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { LoadingUiForNewOrEditPage } from "./loading-ui-new-or-edit-page"
import { ListDropdownMenu } from "./tiptap-ui/list-dropdown-menu"
import { PublishButton } from "./publish-button"

export function NewBlog({ createBlogAction } : { createBlogAction : (formData : FormData) => void}) {

    const [title,setTitle] = useState<string>('')
    const [content,setContent] = useState<string>('')

    const editor = useEditor({
        immediatelyRender : false,
        extensions : extentions,
        onUpdate : ({ editor }) => {
            setContent(JSON.stringify(editor.getJSON()))
        },
        editorProps : {
            attributes : {
                class : 'caret-green-500 min-h-[59vh] md:min-h-[57vh] lg:min-h-[60vh] max-w-md min-w-0 border border-2 border-green-200 focus:outline-none p-2  mt-5 prose max-w-none rounded-lg'
            }
        }
    })

    if(!editor) {
        return <LoadingUiForNewOrEditPage />
    }
    
    return (
        <div className="p-5 sm:p-7 md:p-10 flex justify-center">
            <EditorContext.Provider value={{ editor }}>
                <form action={createBlogAction} className="w-full xl:w-[70vw]">
                    <div className="flex flex-col">
                        <Input 
                            type='text' 
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="Enter title for your blog..." 
                            className="mb-5 border-2 border-green-300  caret-green-400"
                        />
                        <input type='hidden' name='content' value={content} />
                        <div className="flex gap-5 flex-wrap justify-center">
                            <UndoRedoButton action="undo" />
                            <UndoRedoButton action="redo" />
                            <MarkButton type="bold" />
                            <MarkButton type="italic" />
                            <MarkButton type="strike" />
                            <MarkButton type="underline" />
                            <ColorHighlightPopover />
                            <HeadingDropdownMenu className="text-xl hover:text-green-500" levels={[1,2,3, 4, 5]}/>
                            <TextAlignButton align="left" />
                            <TextAlignButton align="center" />
                            <TextAlignButton align="right" />
                            <ListDropdownMenu types={['bulletList', 'orderedList']} />
                            {title && content ? <PublishButton label="Publish" /> : (
                                <Button type='submit' disabled className="bg-green-400">Publish</Button>
                            )}
                        </div>
                        <EditorContent editor={editor} role="presentation"/>
                    </div>
                </form>
            </EditorContext.Provider>
        </div>
    )
}