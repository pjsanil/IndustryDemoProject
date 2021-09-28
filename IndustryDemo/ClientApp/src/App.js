import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
//import { Home } from './components/Home';
//import { Counter } from './components/Counter';
import { FetchCustomers } from './components/FetchCustomers';
import { FetchProduct } from './components/FetchProduct';
import { FetchSales } from './components/FetchSales';
import { FetchStore } from './components/FetchStore';
import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        {/* <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} /> */}
        
        <Route path='/customers' component={FetchCustomers} />
        <Route path='/products' component={FetchProduct} />
        <Route path='/sales' component={FetchSales} />
        <Route path='/stores' component={FetchStore} />
       
      </Layout>
    );
  }
}
