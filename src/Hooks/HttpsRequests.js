import { useEffect, useState } from 'react'
import axios from 'axios'

export function useAxiosGet(url, pageNumber, query) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [titles, setTitles] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setTitles([])
    }, [url,query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: url + "&page=" + pageNumber,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setTitles(prevTitles => {
                return [...new Set([...prevTitles, ...res.data.results])]
            })
            setHasMore(res.data.page < res.data.total_pages)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
            setLoading(false)
        })
        return () => cancel()
    }, [url, query, pageNumber])

    return { loading, error, titles, hasMore }
}
export function useSpecificTitleGet(url){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        setLoading(true)
        setError(false)
        axios.get(url).then(res =>{
            setData(res.data)
        }).catch(() => {
            setError(true)
        })
    },[url])

    return {loading,error,data}
}