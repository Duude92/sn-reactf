import React, { Component, createRef } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import './Styles/SideMenu.css'
import { Button } from '@mui/material';


const LinkRef = React.forwardRef((props, ref) => <Link ref={ref} {...props} />)


export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
    this.btnRef = createRef();
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div className='side-menu' style={{ width: '15vw' }}>
        <Navbar className='navbar-style '>
          {/* <Navbar className="navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 side-menu" container light> */}
          <header>
            <NavbarBrand tag={Link} to="/">sn_aspreact</NavbarBrand>
          </header>
          {/* <NavbarToggler onClick={this.toggleNavbar} className="mr-2" /> */}
          {/* <Collapse className="d-sm-inline-flex" isOpen={!this.state.collapsed} navbar> */}
          <ul className="navbar-nav flex-grow" style={{ width: '100%' }}>
            <NavItem>
              {/* <NavLink tag={Link} className="text-dark navlink" to="/">Home</NavLink> */}
              <Button component={LinkRef} sx={{display:'block'}} to="/"  >Home</Button>

              {/* <Button tag={Link}  className='nav-link' variant='light' href='/' >Home</Button>{' '} */}
            </NavItem>
            <NavItem>
              {/* <NavLink tag={Link} className="text-dark navlink" to="/fetch-data">Fetch data</NavLink> */}
              <Button component={LinkRef} sx={{display:'block'}} to="/fetch-data"  >Fetch data</Button>
            </NavItem>
            <LoginMenu>
            </LoginMenu>
          </ul>
        </Navbar>
      </div>
    );
  }
}
