import React from 'react';

class BlogBody extends React.Component{
    
    state = { lat: null, errorMessage: '' }; 

    constructor(props) {
        super(props);
        this.children = props.children;
    }

    // You always have to define render!
    // Do not use render for anything other than returning JSX!
    render(){
        return (
            <div className="ui">
                <div className="content">
                    { this.children }             
                </div>
            </div>            
        )
    };
}

export default BlogBody;