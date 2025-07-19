"use client"

import { EditorContent,EditorContext,useEditor } from "@tiptap/react"
import { HeadingDropdownMenu } from '@/components/tiptap-ui/heading-dropdown-menu'
import { Button } from "@/components/ui/button"
import { ColorHighlightPopover } from "@/components/tiptap-ui/color-highlight-popover"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from '@/components/tiptap-ui/undo-redo-button'
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { useParams } from "next/navigation"
import { extentions } from "@/lib/tiptap-extensions"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { updateBlog } from "@/lib/actions/update-blog"
import { LoadingUiForNewOrEditPage } from "@/components/loading-ui-new-or-edit-page"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { PublishButton } from "@/components/publish-button"

export default function EditBlog() {
    const { slug } = useParams<{ slug : string }>()

    const [title,setTitle] = useState<string>('')
    const [content,setContent] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(true)
    const [oldSlug,setOldSlug] = useState<string>("")
    const [isBlogFound,setIsBlogFound] = useState<boolean>(false)

    const editor = useEditor({
        immediatelyRender : false,
        extensions : extentions,
        editable : true,
        onUpdate : ({ editor }) => {
            setContent(JSON.stringify(editor.getJSON()))
        },
        editorProps : {
            attributes : {
                class : 'caret-green-500 min-h-[63vh] border border-2 border-green-200 focus:outline-none p-2 w-full mt-5 prose max-w-none rounded-lg'
            }
        }
    })

    useEffect(() => {
        fetch(`/api/blog/${encodeURIComponent(slug)}`)
            .then(async (res) => {

                if(!res.ok) {
                    if(res.status === 404) {
                        setIsBlogFound(false)
                        throw new Error("Blog not found")
                    }
                    else if(res.status === 500)
                        throw new Error("Internal Server Error")
                }

                const data = await res.json()

                setOldSlug(data.slug)
                setTitle(data.title)
                setContent(JSON.stringify(data.content))
                setLoading(false)   
                setIsBlogFound(true)
            })
            .catch((error) => {
                console.log('Failed to fetch the blog '+error)
                setLoading(false)
                setIsBlogFound(false)
            })
    },[slug])

    useEffect(() => {
        if(editor && !loading && content) {
             const parsed = JSON.parse(content)
             editor.commands.setContent(parsed)
        }
    },[editor,loading,content])


    if((!editor || content === '' || title === "") && loading) {
        return <LoadingUiForNewOrEditPage />
    }

    if(!isBlogFound) {
        return <div className="h-[92vh] flex justify-center items-center text-green-900">Blog post not found</div>
    }

    return (
        <div className="p-5 sm:p-7 md:p-10 flex justify-center">
            <EditorContext.Provider value={{ editor }}>
                <form action={updateBlog} className="w-full xl:w-[70vw]">
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
                        <input type='hidden' name='oldSlug' value={oldSlug} />
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
                            {title && content ? <PublishButton label="Update blog" /> : (
                                <Button type='submit' disabled className="bg-green-400">Update blog</Button>
                            )}
                        </div>
                        <EditorContent editor={editor} role="presentation"/>
                    </div>
                </form>
            </EditorContext.Provider>
        </div>
    )
}