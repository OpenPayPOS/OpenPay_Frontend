import { useEffect, useState } from "react"

export const useApi = <T>(url: string, options?: RequestInit) => {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await fetch(url, options)
            setData(await response.json())
        } catch (error) {
            setError(error)
        }

        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data, isLoading, error }
}

export const useApiAtAction = <T>(url: string, isJson: boolean) => {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)

    const fetchData = async (options?: RequestInit) => {
        setIsLoading(true)

        try {
            const response = await fetch(url, options)
            if (response.ok) {
                if (isJson) {
                    setData(await response.json())
                }
                else {
                    setData(response.body as T)
                }
            } else {
                const text = await response.text()
                console.log(text)
                try {
                    setError(`${response.status} - ${JSON.parse(text).title}`)
                } catch {
                    setError(`${response.status} - ${text}`)
                }
            }

        } catch (error) {
            setError(error)
        }

        setIsLoading(false)
    }

    const resetData = () => {
        setData(null)
        setIsLoading(false)
        setError(null)
    }

    return { data, isLoading, error, fetchData, resetData }
}