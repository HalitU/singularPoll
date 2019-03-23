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

  async componentWillMount(){
    console.log("Testing hub...");

    const hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/chatHub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Error)
      .build();
    
      await hubConnection.start();

      hubConnection.on("ReceiveMessage", (message) => {
        const endcodedMsg = message;
        console.log(endcodedMsg);
        this.pull_poll(this.state.current_pie.pollId);
      });
      console.log("Connected!");

      this.setState({ voteConnection: hubConnection });
  }

  // componentWillMount(){
  //   console.log("Testing hub...");

  //   const hubConnection = new HubConnectionBuilder()
  //     .withUrl('http://localhost:5000/chatHub', {
  //       skipNegotiation: true,
  //       transport: HttpTransportType.WebSockets
  //     })
  //     .configureLogging(LogLevel.Error)
  //     .build();

  //   hubConnection.start().then(() => {
  //     console.log("connected!");
      
  //     var test = this.pull_poll;
  //     // Recieving message means something is changed with the poll so we need to re-take the data
  //     hubConnection.on("ReceiveMessage", (message) => {
  //       const encodedMsg = message;
  //       console.log(encodedMsg);
  //       console.log(test);
  //     });    
  //   }).finally(
  //     this.setState({ voteConnection: hubConnection })
  //   );
  // }
  // Two most crucial methods for the poll hub
  onVoteSubmit = async (choice) => {
    // console.log("Final Choice: " + choice);
    await this.state.voteConnection.invoke("SendVote", choice, this.state.current_pie.pollId);
    this.pull_poll(this.state.current_pie.pollId);
    console.log(this.state.current_pie);
  }
  onMessageSubmit = async (message) => {
    await this.state.voteConnection.invoke("SendMessage", message, this.state.current_pie.pollId);
    this.pull_poll(this.state.current_pie.pollId);
  }
  // Pulling the poll will be done via API
  // After that comments and voting process will be done on two separate but connected hubs
  // This method will be used when someone wants to access to another poll
  pull_poll = async (poll_id) => {
    // Check if the user is already in a hub, if so remove the user from that hub
    if (this.state.current_pie !== null)
      await this.state.voteConnection.invoke("RemoveFromGroup", this.state.current_pie.pollId);
    const response = await axios.get('http://localhost:5000/api/values/' + poll_id);
    this.setState({ current_pie: response.data });
    await this.state.voteConnection.invoke("AddToGroup", this.state.current_pie.pollId);
  }
  post_poll = async (dict) => {
    // Remove client from the previous poll hub if user is already in one
    if(this.state.current_pie !== null)
      await this.state.voteConnection.invoke("RemoveFromGroup", this.state.current_pie.pollId);
    // Post the poll and add user to that polls Hub
    const response = await axios.post('http://localhost:5000/api/values/', dict);
    this.setState({ current_pie: response.data });
    await this.state.voteConnection.invoke("AddToGroup", this.state.current_pie.pollId); 
  }
  render() {
    if ( this.state.current_pie == null ){
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
    if (this.state.current_pie.comments !== null){
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
            choices={ this.state.current_pie } 
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
            <CommentPost 
              commentSubmit={ this.onMessageSubmit }
            />
          </Grid.Row>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
