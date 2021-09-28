import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import {NavBar} from './NavBar';
import Row from 'reactstrap/lib/Row';
export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div >
        <span style={{flexFlow:'row'}}>
        <NavBar />
        </span>
        <div style={{height:50}}>

        </div>
        
        <Container >
          {this.props.children}
        </Container>
        
      </div>
    );
  }
}
