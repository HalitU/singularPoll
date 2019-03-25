import React from 'react';
import { Form, Header, Radio } from 'semantic-ui-react';

class VoteForm extends React.Component{
    state = {
        voteQuestion: null,
        choices: null,
        value: null
    }
    constructor(props){
        super(props);
        this.aVoteMethod = props.voteSubmit;
        this.state.voteQuestion = props.voteQuestion;
        this.state.choices = props.choices;
        // Default choice
        this.state.value = props.choices[0].resultId;
    }
    // handleChange = (e, { value }) => this.setState({ value })
    handleChange = (e, { name, value }) => this.setState({ [name]: value, value: value })

    handleSubmit = () => {
        this.aVoteMethod(this.state.value);
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
                        value={ element.resultId }
                        checked={this.state.value === element.resultId}
                        onChange={this.handleChange}
                    />
                </Form.Field>                
            );
        });
        return (
        <Form onSubmit={ this.handleSubmit }>
            <Header as="h3">{ this.state.voteQuestion }</Header>
            { radio_fields }
            <Form.Button  color="linkedin" content='Vote' />
        </Form>
        )
    }
}

export default VoteForm;