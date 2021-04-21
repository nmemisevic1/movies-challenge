import React, { useState, useRef, useCallback } from 'react'
import TitleGridItem from './Titles/TitleGridItem'
import { Row, Alert, Spinner, Form, FormControl} from 'react-bootstrap'
import { useAxiosGet } from '../Hooks/HttpsRequests'

export default function Movies() {
    
    const [pageNumber, setPageNumber] = useState(1)
    const [query, setQuery] = useState("")
    const [url, setUrl] = useState("https://api.themoviedb.org/3/trending/movie/day?api_key=1e732b8b29336f4c9263a24d54a86994")


    let urlAxios = url;
    let movies = useAxiosGet(urlAxios, pageNumber, query)

    let content = null;

    const observer = useRef()
    const lastMovieElementRef = useCallback(
        (node) => {

            if (movies.loading) return false
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && movies.hasMore) {
                    setPageNumber(prevPageNumber => prevPageNumber + 1)
                }
            })
            if (node) observer.current.observe(node)
        },
        [movies.loading, movies.hasMore],
    )


    if (movies.error) {
        content = <div>
            <Alert key={1} variant='danger'>There was an error! :(</Alert>
        </div>
    }
    if (movies.loading) {
        content = <div>
            <Spinner animation="grow" variant="info" />
        </div>
    }
    if (movies.titles) {

        content = movies.titles.map((movie, index) => {
            if (movies.titles.length === index + 1) return <div key={movie.id} ref={lastMovieElementRef}><TitleGridItem title={movie} /></div>
            else return <div key={movie.id}><TitleGridItem title={movie} /></div>
        })
    }
    function handleSearch(e) {
        if(e.target.value === "") setUrl("https://api.themoviedb.org/3/trending/movie/day?api_key=1e732b8b29336f4c9263a24d54a86994")
        else{
            let urlQuery = "https://api.themoviedb.org/3/search/movie?api_key=1e732b8b29336f4c9263a24d54a86994" + "&query=" + e.target.value;
            setUrl(urlQuery);
            setPageNumber(1)
        }
    }
    return (
        <div>
            <h1>Movies</h1>

                <Form inline>
                    <FormControl onChange={handleSearch} type="text" placeholder="Search"/>
                </Form>
            <Row>
                

                {content}
            </Row>
        </div>
    )
}
