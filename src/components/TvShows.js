import React, { useState, useRef, useCallback } from 'react'
import TitleGridItem from './Titles/TitleGridItem'
import { Row, Alert, Spinner, Form, FormControl} from 'react-bootstrap'
import { useAxiosGet } from '../Hooks/HttpsRequests'


export default function TvShows() {
    const [pageNumber, setPageNumber] = useState(1)
    const [query, setQuery] = useState("")
    const [url, setUrl] = useState("https://api.themoviedb.org/3/trending/tv/day?api_key=1e732b8b29336f4c9263a24d54a86994")


    let urlAxios = url;
    let series = useAxiosGet(urlAxios, pageNumber, query)

    let content = null;

    const observer = useRef()
    const lastSerieElementRef = useCallback(
        (node) => {

            if (series.loading) return false
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && series.hasMore) {
                    setPageNumber(prevPageNumber => prevPageNumber + 1)
                }
            })
            if (node) observer.current.observe(node)
        },
        [series.loading, series.hasMore],
    )


    if (series.error) {
        content = <div>
            <Alert key={1} variant='danger'>There was an error! :(</Alert>
        </div>
    }
    if (series.loading) {
        content = <div>
            <Spinner animation="grow" variant="info" />
        </div>
    }
    if (series.titles) {

        content = series.titles.map((serie, index) => {
            if (series.titles.length === index + 1) return <div key={serie.id} ref={lastSerieElementRef}><TitleGridItem title={serie} tv={true} /></div>
            else return <div key={serie.id}><TitleGridItem title={serie} tv={true}/></div>
        })
    }
    function handleSearch(e) {
        if (e.target.value === "") setUrl("https://api.themoviedb.org/3/trending/tv/day?api_key=1e732b8b29336f4c9263a24d54a86994")
        else {
            setQuery(e.target.value)
            let urlQuery = "https://api.themoviedb.org/3/search/tv?api_key=1e732b8b29336f4c9263a24d54a86994" + "&query=" + e.target.value;
            setUrl(urlQuery);
            setPageNumber(1)
        }
    }
    return (
        <div>
            <h1>Tv Shows</h1>

            <Form inline>
                <FormControl onChange={handleSearch} type="text" placeholder="Search" />
            </Form>
            <Row>
                {content}
            </Row>
        </div>
    )
}
