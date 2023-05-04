import React, { useState } from 'react';
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
    NavbarText,
} from 'reactstrap';

function CustomNavbar(args) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color='dark' dark={true} expand="md">

                <NavbarBrand><img src={Logo} id='logo' alt="Logo" />Onneshon</NavbarBrand>

                <NavbarToggler onClick={toggle} />


                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactNavLink} to='/home' >Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactNavLink} to='/about' >About Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactNavLink} to='/signup' >Sign Up</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactNavLink} to='/login' >Login</NavLink>
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



                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavbar;