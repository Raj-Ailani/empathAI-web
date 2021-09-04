import React, { useEffect, useState } from 'react'
import {Nav,Navbar,NavbarToggler,Collapse, Container, NavItem} from 'reactstrap';
import { Link, NavLink} from 'react-router-dom';
import { Button, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import jwt_decode from "jwt-decode";


const Header = () => {

    const [isNavOpen,toggleNav] = useState(false)
    const userLogin = useSelector(state => state.userLogin)
    const {loading,error,userInfo} =userLogin
    const dispatch = useDispatch( )

    useEffect(() => {
        if(userInfo){
            const jwtDate = jwt_decode(userInfo.data.token)
            console.log(jwtDate)
        }

    }, [])
    
    const logoutHandler =() =>{
        dispatch(logout())

    }
    return (
        <div id='header'>
            <Navbar id='navbar' expand='md'>
            <NavbarToggler onClick={()=>toggleNav(!isNavOpen)}><i className="fa fa-bars" id='bars'></i>
            </NavbarToggler>
            
                <Container id='logo-cont' className='mr-auto'>
                            <NavLink to="/">
                                <img src="/assets/logo.png" alt="logo" className="logo"></img>
                            </NavLink>
                 </Container>

                 <Collapse isOpen={isNavOpen} navbar>
                 
                   {userInfo ?  
                     <NavDropdown  className="ml-auto nav-item" title={'ADMIN'} id='nav-real'>
                            <LinkContainer to='/admin/productlist'>
                                   <NavDropdown.Item>
                                   Product List  
                                   </NavDropdown.Item>
                                   </LinkContainer>
                           <NavDropdown.Item onClick={logoutHandler} >
                               Logout
                           </NavDropdown.Item>
                    </NavDropdown>

                    : <Nav   className="ml-auto"><NavItem >
                    <NavLink  className="nav-item" to="/login"> Sign In &ensp;<i className="fa fa-user" /></NavLink>
                    </NavItem>
 
                    </Nav>}
         
                        
               </Collapse>

            </Navbar>    
        </div>
    )
}

export default Header
