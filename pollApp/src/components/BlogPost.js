import React from 'react';

import { Comment } from 'semantic-ui-react';
import Moment from 'react-moment';
import 'moment-timezone';

class BlogPost extends React.Component{
    
    state = { lat: null, errorMessage: '' }; 

    constructor(props) {
        super(props);  
        this.author = props.author;
        this.image = props.image;
        this.text = props.text; 
        this.date = props.date;
    };

    // You always have to define render!
    // Do not use render for anything other than returning JSX!
    render(){
        return (
            <Comment>
                <Comment.Avatar as='a' src={ this.image } height="20%" width="20%" />
                <Comment.Content>
                    <Comment.Author as='a'>{ this.author }</Comment.Author>
                    <Comment.Metadata>
                        <Moment>{ this.date }</Moment>
                    </Comment.Metadata>
                    <Comment.Text>{ this.text }</Comment.Text>
                </Comment.Content>
            </Comment>            
        )
    };
}

export default BlogPost;