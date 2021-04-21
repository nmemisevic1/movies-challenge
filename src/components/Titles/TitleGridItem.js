import React from 'react'
import { Card} from 'react-bootstrap'
import './titles.css'


export default function TitleGridItem(props) {
    //let id = props.title.id
    const posterUrl = "https://image.tmdb.org/t/p/w500/" + props.title.poster_path;
    let name
    if(props.title.title == null) name = props.title.name
    else name = props.title.title
    


    return (
        <Card className='titleGridItem' style={{ width: '12rem', height: '23rem'}} bg="dark">
            <Card.Img className="titleImg" variant="top" src={posterUrl} />
            <Card.Body style={{ marginTop: '-1.25rem' }}>
                <Card.Title style={{fontWeight: '600', padding:'0' }}>{name}</Card.Title>
                <Card.Text style={{fontWeight: '300', marginTop: '-10px' }}>{props.genre}</Card.Text>
            </Card.Body>
            
        </Card>
    )
}
