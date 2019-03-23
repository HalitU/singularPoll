import React from 'react';
import { Menu } from 'semantic-ui-react'

import NewPoll from './NewPoll';
import ExistingPoll from './ExistingPoll';

class TopBar extends React.Component{
    state = {
        current_id: null,
        new_poll_id: null,
        existing_modal: false
    }

    constructor(props){
        super(props);
        this.pull_poll = props.pull_poll;
        this.post_poll = props.post_poll;
        this.state.current_id = props.current_id;
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleChange = (event) => {
        this.setState({ new_poll_id: event.target.value });
        console.log(this.state);
    }

    handleSubmit = (event) => {
        console.log(this.state);
        this.pull_poll(this.state.new_poll_id);
    }
    componentDidUpdate(preProp){
        if(preProp.current_id !== this.props.current_id)
            this.setState({ current_id: this.props.current_id });
    }
    render(){
        const { activeItem } = this.state
        return(
            <Menu>
                <Menu.Item
                name='poll_id'
                >
                Poll ID: { this.state.current_id }
                </Menu.Item>                

                <Menu.Item
                name='new_poll'
                active={activeItem === 'new_poll'}
                onClick={this.handleItemClick}
                >
                    <NewPoll 
                        post_poll={ this.post_poll }
                    />
                </Menu.Item>
        
                <Menu.Item 
                name='get_poll' 
                active={activeItem === 'get_poll'} 
                onClick={ this.handleItemClick }>    
                    <ExistingPoll 
                        open={ this.state.existing_modal }
                        handleChange={ this.handleChange }
                        handleSubmit={ this.handleSubmit }
                    />
                </Menu.Item>
            </Menu>            
        );
    }
}

export default TopBar;