import {Link} from 'react-router-dom';
import {Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import auth from "../HelperClasses/Auth";
import {useState} from "react";


function NavigationBar({isAuth, setIsAuth}) {
    // console.log('nav '+auth.isAuthenticated())
    // console.log('nav ' + isAuth)
    function handleLogout()
    {
        console.log('log Out handle')
        setIsAuth(false)
        auth.logout();
    }
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">AYD</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="me-auto">
                    <Nav.Link className="nav-item">
                        <Link className="nav-link" to='/'>Home</Link>
                    </Nav.Link>
                    <Nav.Link className="nav-item">
                        <Link className="nav-link" to='/profile'>Profile</Link>
                    </Nav.Link>
                </Nav>
                <Nav className="float-lg-right float-md-none-left float-sm-end float-xs-end">
                    {
                        isAuth === false ?
                            <Nav.Link className="nav-item">
                                <Link className="nav-link" to='/login'>LogIn</Link>
                            </Nav.Link>
                            :
                            <Nav.Link className="nav-item">
                                    <button className="nav-link btn" type="button" onClick={handleLogout}>
                                        Logout
                                    </button>
                            </Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;
// }<Nav.Link className="nav-item">
//     <Link className="nav-link" to='/logout'>Logout</Link>
// </Nav.Link>
