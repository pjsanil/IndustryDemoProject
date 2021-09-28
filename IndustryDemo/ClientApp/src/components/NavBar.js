import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'
//import '';

export class NavBar extends Component {
  state = { activeItem: 'Home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div >
        <Menu inverted  >
          <Menu.Item
         
            //as={NavLink} to="/"
            name='Industry Demo'
            //active={activeItem === 'Home'}
            //onClick={this.handleItemClick}
          />

          <Menu.Item
            as={NavLink} to="/customers"
            name='Customers'
            //active={activeItem === 'Customers'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={NavLink} to="/products"
            name='Products'
            //active={activeItem === 'Products'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={NavLink} to="/stores"
            name='Stores'
            //active={activeItem === 'Stores'}
            onClick={this.handleItemClick}
          />
<Menu.Item
            as={NavLink} to="/sales"
            name='Sales'
            //active={activeItem === 'Sales'}
            onClick={this.handleItemClick}
          />



        </Menu>
      </div>
    )
  }
}

