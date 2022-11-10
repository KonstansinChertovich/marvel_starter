import { useState, useCallback } from "react"

export const useHttpHooks = () => {
    const [status, setstatus] = useState('waiting')

    const request = useCallback(async (url, method = 'GET', headers = {'Content-type': 'application/json'}, body = null) => {

        
        setstatus('loaded')
        try {
            const res= await fetch(url,{method,headers,body})

            if(!res.ok) throw new Error(`Could not fetch ${url}, status:${res.status}`)

            const data = await res.json()

            return data
        } catch(e) {
            setstatus('error')
            throw e
        }

    }, [])

    const clearError = useCallback(() => {
        setstatus('waiting')
    }, [])

    return {status,request,clearError,setstatus}
}