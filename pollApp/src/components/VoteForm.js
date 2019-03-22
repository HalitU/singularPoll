import React from 'react';
import { Form, Header, Radio } from 'semantic-ui-react';

class VoteForm extends React.Component{
    // state = { selectedOption: null };
    
    // handleSubmit = (event) => {
    //     // Dont refresh the page
    //     event.preventDefault();
    //     console.log(this.state.selectedOption);
    // }
    state = {}
    constructor(props){
        super(props);
        this.aVoteMethod = props.voteSubmit;
    }
    handleChange = (e, { value }) => this.setState({ value })
    handleSubmit = () => {
        console.log("Submitted value: ", this.state.value);
    }

    render() {
        return (
        <Form onSubmit={ this.aVoteMethod }>
            <Form.Field>
            <Radio
                label='Choose this'
                name='radioGroup'
                value='this'
                checked={this.state.value === 'this'}
                onChange={this.handleChange}
            />
            </Form.Field>
            <Form.Field>
            <Radio
                label='Or that'
                name='radioGroup'
                value='that'
                checked={this.state.value === 'that'}
                onChange={this.handleChange}
            />
            </Form.Field>
            <Form.Button content='Submit' />
        </Form>
        )
    }
}

export default VoteForm;