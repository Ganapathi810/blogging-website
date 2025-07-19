"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

export const PublishButton = ({ label } : { label : string }) => {
    const { pending } = useFormStatus()

    return (
        <Button type='submit' disabled={pending} className="bg-green-400 hover:bg-green-500 active:bg-green-600 flex gap-2 items-center">
            {pending && <Loader2 className="animate-spin h-5 w-5 stroke-green-700"/>}
            {pending ? `${label === 'Publish' ? "Publishing..." : "Updaing blog..."}` : `${label}`}
        </Button>
    )
}