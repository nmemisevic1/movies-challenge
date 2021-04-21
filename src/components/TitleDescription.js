import React,{useState} from 'react'
import {Alert,Spinner,Button} from 'react-bootstrap'
import { useSpecificTitleGet } from '../../Hooks/HttpsRequests'
export default function TitleDescription(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const urlMovie = "https://api.themoviedb.org/3/movie/" + props.id + "?api_key=1e732b8b29336f4c9263a24d54a86994&language=en-US"
    const urlSeries = "https://api.themoviedb.org/3/tv/" + props.id + "?api_key=1e732b8b29336f4c9263a24d54a86994&language=en-US"

    let url = props.tv ? urlSeries : urlMovie
    let name = "", genres = "", description = "", posterUrl = "";
    let title = useSpecificTitleGet(url)
    let content = null;

    if (title.error) {
        content = <div>
            <Alert key={1} variant='danger'>There was an error! :(</Alert>
        </div>
    }
    if (title.loading) {
        content = <div>
            <Spinner animation="grow" variant="info" />
        </div>
    }
    if (title.data){
        let data = Array.from(title.data);
        if(data.name != null) name = data.name;
        else name = data.title;
        if(title.data.genres != null){
        for(var i=0;i<title.data.genres.length;i++){
            genres += title.data.genres[i].name + "|";
        }
    }
        description = data.overview
        posterUrl = "https://image.tmdb.org/t/p/w500/" + data.poster_path;
    }
    
    
    return (

        <div>
           
                    <img className="img-fluid" src={posterUrl}></img>
                    <h3>Genres: {genres}</h3>
                    <h4>Description: {description}</h4>
                    <Button variant="secondary" onClick={handleClose}>
                     Back
                    </Button>
            
        </div>
    )
}
