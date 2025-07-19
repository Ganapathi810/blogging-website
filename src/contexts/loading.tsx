"use client"

import { createContext, useContext, useState } from "react"


interface LoadingContextType {
    loading : boolean,
    setLoading : React.Dispatch<React.SetStateAction<boolean>>
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)


export const LoadingContextProvider = ({ children } : { children : React.ReactNode }) => {
    const [loading,setLoading] = useState<boolean>(false)
    return (
        <LoadingContext.Provider value={{ loading,setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoadingContext = () => {
    const context = useContext(LoadingContext)

    if(!context) throw new Error("useLoadingContext must be within LoadingContextProvider")

    return context
}