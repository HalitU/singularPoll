import React from 'react';
import { Form, Header, Radio } from 'semantic-ui-react';

class VoteForm extends React.Component{
    // state = { selectedOption: null };
    
    // handleSubmit = (event) => {
    //     // Dont refresh the page
    //     event.preventDefault();
    //     console.log(this.state.selectedOption);
    // }
    state = {
        voteQuestion: null,
        choices: null
    }
    constructor(props){
        super(props);
        this.aVoteMethod = props.voteSubmit;
        this.state.voteQuestion = props.voteQuestion;
        this.state.choices = props.choices;
    }
    handleChange = (e, { value }) => this.setState({ value })
    handleSubmit = () => {
        console.log("Submitted value: ", this.state.value);
    }

    componentDidUpdate(prevProps){
        // Condition check is important to prevent infinite loops
        if(prevProps.voteQuestion !== this.props.voteQuestion){
            this.setState({ voteQuestion: this.props.voteQuestion, choices: this.props.choices });
        }
    }
    render() {
        // Prepare radio fields for selection
        var radio_fields = [];
        this.state.choices.forEach(element => {
            radio_fields.push(
                <Form.Field>
                    <Radio
                        label={ element.name }
                        name='radioGroup'
                        value={ element.name }
                        checked={this.state.value === element.name}
                        onChange={this.handleChange}
                    />
                </Form.Field>                
            );
        });
        return (
        <Form onSubmit={ this.aVoteMethod }>
            <Header as="h3">{ this.state.voteQuestion }</Header>
            { radio_fields }
            <Form.Button content='Submit' />
        </Form>
        )
    }
}

export default VoteForm;