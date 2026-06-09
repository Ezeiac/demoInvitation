"use client"

import { createBrowserSupabaseClient } from "@/app/lib/supabase/client"
import React, { useEffect, useState } from 'react'

type dataBase = {
    data?: any
}

export const useFetch = () => {

    const [resBase, setResBase] = useState<Array<dataBase>>([{}])

    const fetchData = async () => {
        const supabase = createBrowserSupabaseClient()
        const { data, error } = await supabase
            .from('guests')
            .select('*')

        if (error) {
            console.log(error.message)
            return
        }
        setResBase(data)

    }

    useEffect(() => {
        fetchData()
    }, [])

    return ({
        resBase
    })
}
