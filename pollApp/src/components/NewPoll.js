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
    constructor(props){
        super(props);
        console.log("re" , props.post_poll);
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
        console.log(this.state)
    }
    handleSubmission = (event) => {
        this.close_modal();
        console.log(event);
        // Prepare the dictionary for post
        var dict = {
            "pollQuestion": this.state.newPollQuestion,
            "results": []
        }
        for(var choice in this.state.choices){
            console.log(this.state.choices[choice]);
            var key = this.state.choices[choice];
            console.log(this.state[key]);
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
        console.log("Adding a new choice...");
        var new_choices = this.state.choices;
        var index = this.state.choices.length;
        var input_name = "Choice" + index;
        new_choices.push( input_name );
        this.setState({ choices: new_choices });
        console.log(this.state.choices);
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
                        <Form onSubmit={ console.log("Posting...") }>
                            <Form.Field label='Poll Question:' name="newPollQuestion" control='textarea' rows='2' onChange={ this.handleInputChange } />
                            <Form.Group>
                                <Form.Button color="blue" onClick={ this.addNewChoice }>Add New Choice</Form.Button>
                            </Form.Group>
                            {
                                this.state.choices.map((val, idx) => {
                                    return (
                                        <Form.Field key={ val }>
                                            <Input placeholder={ val } name={ val } onChange={ this.handleInputChange } />
                                        </Form.Field>   
                                    )
                                })
                            }
                            <Form.Group>
                                <Form.Button onClick={ this.handleSubmission } color="green">Submit</Form.Button>
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