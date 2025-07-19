"use client"

import { createContext, useContext, useState } from "react"


type AlertInfoData = {
    message : string, 
    status : 'success' | 'error'
}

type AlertInfoContextType = {
   alertInfo : AlertInfoData | null,
   setAlertInfo : React.Dispatch<React.SetStateAction<AlertInfoData | null>>
}
const AlertInfoContext = createContext<AlertInfoContextType | null>(null)

export const AlertInfoContextProvider = ({ children } : { children : React.ReactNode}) => {
    const [alertInfo,setAlertInfo] = useState<AlertInfoData | null>(null)

    return (
        <AlertInfoContext.Provider value={{ alertInfo,setAlertInfo }}>
            {children}
        </AlertInfoContext.Provider>
    )
}

export const useAlertInfoContext = () => {
    const context = useContext(AlertInfoContext);
    if(!context) throw new Error('useAlertInfoContext must be within AlertInfoContextProvider')
    
    return context
}