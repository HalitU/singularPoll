import React from 'react';
import { Modal, Button, Form, Icon } from 'semantic-ui-react';

class ExistingPoll extends React.Component{
    state = { open: false }
    open_modal = () => { this.setState({ open: true }) }
    close_modal = () => { 
        this.setState({ open: false }) 
    }
    handleSubmission = (event) => {
        this.close_modal();
        this.props.handleSubmit(event);
    }
    render(){
        return(
            <Modal 
                open={ this.state.open }
                size={"mini"}
                trigger={<Button onClick={ this.open_modal } basic>Existing Poll</Button>}>
                <Modal.Header>Please Enter the Poll Number</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={ this.handleSubmission }>
                            <Form.Group>
                                <Form.Field 
                                    label='Poll ID' 
                                    name='poll_id' 
                                    onChange={ this.props.handleChange } 
                                    control='input' 
                                    type='number' 
                                    min={0}
                                    required
                                    />
                            </Form.Group>
                            <Form.Button>Submit</Form.Button>
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

export default ExistingPoll;