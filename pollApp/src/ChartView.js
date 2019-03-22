import React from 'react';
import axios from 'axios';

// Recharts
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';
/*
    Content gets updated dynamically for every specified N second-millisecond
*/
class ChartView extends React.Component{
    state = {
        data: null,
        api_connection: null
    }
    constructor(props) {
        super(props);  
        this.COLORS = props.COLORS;
        this.pie_data = props.pie_data;
        this.state.data = props.pie_data;
    }    
    contentUpdate = function(){
        axios.get('http://localhost:5000/api/values')
            .then((response) => console.log(response));        
    }
    updatePieData = function(new_pie){
        console.log(new_pie);
        var result = [];
        for(let i=0;i<new_pie.data.length;i++){
            result.push(
                {
                    "name": this.pie_data[i].name,
                    "value": new_pie.data[i]
                }
            );
        }
        this.setState({ data: result });
    }
    fetchPieData = function(){
        axios.get('http://localhost:5000/api/values')
            .then((response) => this.updatePieData(response));     
    }
    componentDidMount(){
        //this.interval = setInterval(() => this.setState({ time: Date.now() }), 3000);
        //this.interval = setInterval(() => this.fetchPieData(), 3000);
        this.fetchPieData();
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    render(){
        return(
            <ResponsiveContainer height={200} width='100%'>
                <PieChart width={730} height={250}>
                    <Pie isAnimationActive={false} data={ this.state.data } dataKey="value" nameKey="name" outerRadius={70} label>
                    {
                        this.pie_data.map((entry, index) => <Cell key={null} fill={this.COLORS[index % this.COLORS.length]}/>)
                    }
                    </Pie>
                </PieChart> 
            </ResponsiveContainer>              
        )
    }
}

export default ChartView;