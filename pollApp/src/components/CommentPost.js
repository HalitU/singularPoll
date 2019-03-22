import React from 'react';
import { Form } from 'semantic-ui-react';

class CommentPost extends React.Component{
    state = {}

    handleChange = (e, { name, value }) => this.setState({ [name]: value })
  
    handleSubmit = () => this.setState({ name: '' })
  
    render() {
      const { name } = this.state
  
      return (
        <Form onSubmit={this.handleSubmit}>
            <Form.Field>
                <Form.TextArea placeholder='Comment' name='name' value={name} onChange={this.handleChange} />
            </Form.Field>
            <Form.Button content='Submit' />
        </Form>
      )
    }
}

export default CommentPost;
