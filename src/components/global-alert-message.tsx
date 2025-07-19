"use client"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { useAlertInfoContext } from "@/contexts/alert-info-context";
import { AlertCircleIcon, CheckCircle2Icon  } from "lucide-react";

export default function GlobalAlertMessage() {
    const  { alertInfo } = useAlertInfoContext()

    return (
        <>
            {alertInfo && <Alert variant={`${alertInfo.status === 'success' ? 'default' : 'destructive'}`} className="z-50 absolute top-20 right-4 w-[350px] flex items-center">
                {alertInfo?.status === 'success' ? <CheckCircle2Icon /> : <AlertCircleIcon />}
                <AlertTitle>{alertInfo.message}</AlertTitle>
            </Alert>}
        </>
    )
}