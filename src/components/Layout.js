import { Container } from '@mui/material';
import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import Sidebar from './Sidebar';
import LayoutStyles from './Styles/Layout.module.css';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <Container sx={{ display: 'flex', height: '100%' }}>
        {/* <div className={LayoutStyles.contentwrapper}> */}
        <NavMenu />
        <Container tag="main" sx={{ display: 'flex', flexDirection: 'row' }}>
          <Container sx={{ width: '100%' }}>

            {this.props.children}
          </Container>
          <Sidebar />

        </Container>
        {/* </div > */}
      </Container>
    );
  }
}
