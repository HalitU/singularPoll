import React from 'react';
import { Modal, Button, Form, Icon, Input } from 'semantic-ui-react';

class NewPoll extends React.Component{
    state = { 
        open: false,
        choices: [
            "Choice0",
            "Choice1"
        ],
        newPollQuestion: null
    }
    open_modal = () => { this.setState({ open: true }) }
    close_modal = () => { 
        this.setState({ open: false }) 
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }
    handleSubmission = (event) => {
        this.close_modal();
        // Prepare the dictionary for post
        var dict = {
            "pollQuestion": this.state.newPollQuestion,
            "results": []
        }
        for(var choice in this.state.choices){
            var key = this.state.choices[choice];
            dict["results"].push(
                {
                    "name": this.state[key],
                    "votes": 1
                }
            );
        }
        this.props.post_poll(dict);
    }    
    addNewChoice = () => {
        var new_choices = this.state.choices;
        var index = this.state.choices.length;
        var input_name = "Choice" + index;
        new_choices.push( input_name );
        this.setState({ choices: new_choices });
    }
    render(){
        return(
            <Modal 
                open={ this.state.open }
                size="small"
                trigger={<Button onClick={ this.open_modal } basic>New Poll</Button>}>
                <Modal.Header>Creating a New Poll</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={ this.handleSubmission }>
                            <Form.Field 
                                label='Poll Question:' 
                                name="newPollQuestion" 
                                control='textarea' 
                                rows='2' 
                                onChange={ this.handleInputChange }
                                maxLength={ 200 }
                                required />
                            <Form.Group>
                                <Form.Button 
                                    color="blue" 
                                    type="button"
                                    onClick={ this.addNewChoice }
                                    content="Add New Choice" />
                            </Form.Group>
                            {
                                this.state.choices.map((val, idx) => {
                                    return (
                                        <Form.Field key={ val }>
                                            <Input 
                                                key={ val }
                                                placeholder={ val } 
                                                name={ val } 
                                                onChange={ this.handleInputChange }
                                                maxLength={ 200 }
                                                required />
                                        </Form.Field>   
                                    )
                                })
                            }
                            <Form.Group>
                                <Form.Button 
                                    color="green"
                                    content="Submit" />
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                <Button onClick={ this.close_modal } color='red'>
                    <Icon name='remove' /> Cancel
                </Button>
                </Modal.Actions>                
            </Modal>             
        )
    }
}

export default NewPoll;