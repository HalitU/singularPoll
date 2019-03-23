import React from 'react';

// Recharts
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';
/*
    Content gets updated dynamically for every specified N second-millisecond
*/
class ChartView extends React.Component{
    state = {
        data: null,
        api_connection: null,
        choices: null
    }
    constructor(props) {
        super(props);  
        this.COLORS = props.COLORS;
        this.state.choices = props.choices.results;
    }    
    componentDidUpdate(prevProps){
        console.log("ahh ah");
        if(prevProps.pollQuestion !== this.props.pollQuestion)
            this.setState({ choices: this.props.choices.results });
        if(prevProps.choices !== this.props.choices)
            this.setState({ choices: this.props.choices.results });

    }
    render(){
        return(
            <ResponsiveContainer height={200} width='100%'>
                <PieChart width={730} height={250}>
                    <Pie isAnimationActive={false} data={ this.state.choices } dataKey="votes" nameKey="name" outerRadius={70} label>
                    {
                        this.state.choices.map((entry, index) => <Cell key={null} fill={this.COLORS[index % this.COLORS.length]}/>)
                    }
                    </Pie>
                </PieChart> 
            </ResponsiveContainer>              
        )
    }
}

export default ChartView;