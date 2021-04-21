import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">TMDB</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/tvshows">TV Shows</Nav.Link>
                <Nav.Link href="/movies">Movies</Nav.Link>
                <Nav.Link href="/categories">Categories</Nav.Link>
            </Nav>

        </Navbar>
    )
}
