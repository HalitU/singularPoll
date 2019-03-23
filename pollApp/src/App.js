import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

// Additional imports
import BlogBody from './BlogBody';
import BlogPost from './BlogPost';
import ChartView from './ChartView';
import CommentPost from './components/CommentPost';
import TopBar from './components/TopBar';
import VoteForm from './components/VoteForm';

// For fake images
import faker from 'faker';

/*
TODO: 
  1. New poll forum
  2. Database connection
  3. Map poll results to pie chart
  4. Comment section for each poll
  5. Generate different colors for each entry
  6. Dynamically update votes in a poll
  7. SQLLite for the dotnet part
  8. Each poll id will activate another unique hub
  9. Only show navbar items or random poll at initial opening
  10. Add ConnectionId to Group or create if it doesnt exist for SignalR
*/

// Semantic-ui-react
import { Grid, Comment, Header, GridColumn } from 'semantic-ui-react';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@aspnet/signalr';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class App extends Component {
  state = {
    data : [
      {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 300, pv: 2200, amt: 2200},
      {name: 'Page C', uv: 200, pv: 2000, amt: 2000},
      {name: 'Page D', uv: 100, pv: 1800, amt: 1800}
    ],
    pie_data: [
      {
        "name": "Group A",
        "value": 400
      },
      {
        "name": "Group B",
        "value": 300
      },
      {
        "name": "Group C",
        "value": 300
      },
      {
        "name": "Group D",
        "value": 200
      },
      {
        "name": "Group E",
        "value": 278
      },
      {
        "name": "Group F",
        "value": 189
      }      
    ],
    voteConnection: null,
    poll_id: null,
    current_pie: null
  }

  componentWillMount(){
    console.log("Testing hub...");

    const hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/chatHub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Error)
      .build();

    hubConnection.start().then(function(){
      console.log("connected!");
      
      hubConnection.invoke("SendMessage", "hehe").catch(err => console.error(err.toString()));

      hubConnection.on("ReceiveMessage", (message) => {
        const encodedMsg = message;
        console.log(encodedMsg);
      });    
    }).finally(
      this.setState({ voteConnection: hubConnection })
    );
  }
  onVoteSubmit = () => {
    this.state.voteConnection.invoke("SendMessage", "hehe").catch(err => console.error(err.toString()));
  }
  // Pulling the poll will be done via API
  // After that comments and voting process will be done on two separate but connected hubs
  // This method will be used when someone wants to access to another poll
  pull_poll = (poll_id) => {
    console.log("Getting poll information with id.. ", poll_id);
    // For the sake of experiment we are getting the poll with ID 5
    axios.get('http://localhost:5000/api/values/' + poll_id)
      .then((response) => {
        console.log(response);
        this.setState({ current_pie: response.data });
      });  
  }
  post_poll = (dict) => {
    console.log("Posting poll information with id...");
    axios.post('http://localhost:5000/api/values/', dict)
    .then((response) => {
      console.log(response);
      this.setState({ current_pie: response.data });
    }); 
  }
  render() {
    if ( this.state.current_pie == null ){
      console.log("HAHA!");
      return(
        <Grid verticalAlign='middle' className="vertical-align" centered columns={2}>
          {/* Navigation Bar */}
          <Grid.Row>
            <TopBar 
              current_id="None"
              pull_poll={ this.pull_poll }
              post_poll={ this.post_poll }
            />
          </Grid.Row>     
        </Grid>        
      );
    }
    // Else prepare data update
    var comment_section = [];
    var no_comment_error = null;
    if (this.state.current_pie.comments.length !== 0){
      this.state.current_pie.comments.forEach(element => {
        comment_section.push(
          <BlogBody key={ element.commentId }>
            <BlogPost
              author={ element.commentId }
              image={ faker.image.avatar() } 
              text={ element.text }  
              key={ element.commentId }   
            />
          </BlogBody> 
        );
      });      
    }else{
      no_comment_error = <Comment>Be the first one to comment!</Comment>;
    }

    return (
    
      <Grid centered columns={2}>
        {/* Navigation Bar */}
        <Grid.Row>
          <TopBar 
            pull_poll={ this.pull_poll }
            current_id={ this.state.current_pie.pollId }
            post_poll={ this.post_poll }
          />
        </Grid.Row>
        
        {/* Pie Chart for the Poll */}
        <Grid.Column>
          <ChartView 
            COLORS={COLORS} 
            choices={ this.state.current_pie.results } 
            pollQuestion= { this.state.current_pie.pollQuestion }
          />
        </Grid.Column>
        
        {/* Main Vote Section */}
        <Grid.Row centered columns={4}>
          <GridColumn>
            <VoteForm 
              voteQuestion={ this.state.current_pie.pollQuestion }
              voteSubmit={ this.onVoteSubmit }
              choices={ this.state.current_pie.results }
            />
          </GridColumn>
        </Grid.Row>
        
        {/* Comments */}
        <Grid.Row centered columns={4}>
          <Grid.Column>
            <Header as='h3'>Comments</Header> 
            { no_comment_error }
            <Comment>
              { comment_section }                    
            </Comment>        
          </Grid.Column>   
          <br/><br/><br/>
          <Grid.Row centered columns={4}>
            <Header as='h3'>Post New Comment</Header>
            <CommentPost />
          </Grid.Row>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
