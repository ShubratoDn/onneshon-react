import React, { useEffect, useState } from 'react';
import { NavLink as ReactNavLink } from 'react-router-dom';

import Logo from "../assets/images/logo.png";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import { doLogout, getCurrentUserInfo, isUserLoggedIn } from '../services/auth';

function CustomNavbar(args) {

    //navbar er jonno...automatic
    const [isOpen, setIsOpen] = useState();
    const toggle = () => setIsOpen(!isOpen);


    const [isLoggedin, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setLoggedIn(isUserLoggedIn());
        if (isUserLoggedIn()) {
            setUser(getCurrentUserInfo());
            console.log(user)
        }
    }, [isLoggedin])


    const logout = ()=>{
        doLogout(()=>{
            setLoggedIn(false);
        });
    }



    return (
        <div>
            <Navbar color='dark' dark={true} expand="md">

                <NavbarBrand tag={ReactNavLink} to="/home"><img src={Logo} id='logo' alt="Logo" />Onneshon</NavbarBrand>

                <NavbarToggler onClick={toggle} />


                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactNavLink} to='/home' >Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactNavLink} to='/about' >About Us</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Category
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>Option 1</DropdownItem>
                                <DropdownItem>Option 2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Reset</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>

                    <Nav navbar>

                        {isLoggedin && (
                            <>
                                <NavItem>
                                    <NavLink tag={ReactNavLink} to='/Home' >{user.name} </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={()=>logout()}>Logout </NavLink>
                                </NavItem>
                            </>
                        )}

                        {
                            !isLoggedin && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactNavLink} to='/login' >Login </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactNavLink} to='/signup' >Sign Up</NavLink>
                                    </NavItem>
                                </>
                            )
                        }

                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavbar;