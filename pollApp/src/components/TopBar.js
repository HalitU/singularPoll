import React from 'react';
import { Menu } from 'semantic-ui-react'

class TopBar extends React.Component{
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render(){
        const { activeItem } = this.state

        return(
            <Menu>
                <Menu.Item
                name='editorials'
                active={activeItem === 'editorials'}
                onClick={this.handleItemClick}
                >
                New Pool
                </Menu.Item>
        
                <Menu.Item name='reviews' active={activeItem === 'reviews'} onClick={this.handleItemClick}>
                News
                </Menu.Item>
        
                <Menu.Item
                name='upcomingEvents'
                active={activeItem === 'upcomingEvents'}
                onClick={this.handleItemClick}
                >
                About
                </Menu.Item>
            </Menu>            
        );
    }
}

export default TopBar;