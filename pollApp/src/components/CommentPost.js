import React from 'react';
import { Form } from 'semantic-ui-react';

class CommentPost extends React.Component{
    state = {}
    constructor(props){
      super(props);
      this.onCommentSubmit=props.commentSubmit;
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
  
    handleSubmit = () => {
      this.onCommentSubmit(this.state.name);
      this.setState({ name: '' });
    }
  
    render() {
      const { name } = this.state
  
      return (
        <Form onSubmit={ this.handleSubmit }>
            <Form.Field>
                <Form.TextArea 
                  placeholder='Comment' 
                  name='name' 
                  value={name} 
                  onChange={this.handleChange} 
                  maxLength={ 250 }
                  required/>
            </Form.Field>
            <Form.Button content='Submit' />
        </Form>
      )
    }
}

export default CommentPost;
