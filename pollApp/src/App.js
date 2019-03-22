import React, { Component } from 'react';
import logo from './logo.svg';
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
*/

// Semantic-ui-react
import { Grid, Image, Comment, Header, GridColumn } from 'semantic-ui-react';
import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from '@aspnet/signalr';

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
    poll_id: null
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
  pull_poll(poll_id){
    console.log("Getting poll information with id.. ", poll_id);
  }
  render() {
    return (
     
      <Grid centered columns={2}>
        {/* Navigation Bar */}
        <Grid.Row>
          <TopBar />
        </Grid.Row>

        {/* Pie Chart for the Poll */}
        <Grid.Column>
          <ChartView 
            COLORS={COLORS} 
            pie_data={this.state.pie_data} 
          />
        </Grid.Column>
        
        {/* Main Vote Section */}
        <Grid.Row centered columns={4}>
          <GridColumn>
            <VoteForm 
              voteSubmit={ this.onVoteSubmit }
            />
          </GridColumn>
        </Grid.Row>
        
        {/* Comments */}
        <Grid.Row centered columns={4}>
          <Grid.Column>
            <Header as='h3'>Comments</Header> 
            <Comment>
              <BlogBody>
                <BlogPost
                  author="alex"
                  image={ faker.image.avatar() } 
                  text="Nice react app!"            
                >
                </BlogPost>
              </BlogBody>            
            </Comment>        
          </Grid.Column>   
          <br/>
          <br/>
          <br/>
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
