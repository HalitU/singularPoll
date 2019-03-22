import React from 'react';
import { Menu, Header, Button, Popup, Grid, Form } from 'semantic-ui-react'

class TopBar extends React.Component{
    state = {
        current_id: null,
        new_poll_id: null
    }

    constructor(props){
        super(props);
        this.pull_poll = props.pull_poll;
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
                New Poll
                </Menu.Item>
        
                <Menu.Item 
                name='get_poll' 
                active={activeItem === 'get_poll'} 
                onClick={ this.handleItemClick }>
                    <Popup trigger={<Button basic>Existing Poll</Button>} on='click' flowing hoverable>
                        <Grid centered divided columns={1}>
                            <Grid.Column textAlign='center'>
                                <Header as='h4'>Please Enter the Poll Number</Header>
                                <Form onSubmit={ this.handleSubmit }>
                                    <Form.Group>
                                        <Form.Field label='poll_id' name='poll_id' onChange={ this.handleChange } control='input' type='number' min={0}/>
                                    </Form.Group>
                                    <Form.Button>Submit</Form.Button>
                                </Form>
                            </Grid.Column>
                        </Grid>
                    </Popup>                
                </Menu.Item>
            </Menu>            
        );
    }
}

export default TopBar;