import React from 'react';

// Random color generator
import RandomColor from 'randomcolor';

// Recharts
import { Legend, Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';
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
        this.COLORS = RandomColor.randomColor({luminosity: 'dark',count: props.choices.results.length})
        console.log(this.COLORS.length);
        this.state.choices = props.choices.results;
    }    
    componentDidUpdate(prevProps){
        if(prevProps.pollQuestion !== this.props.pollQuestion)
            this.setState({ choices: this.props.choices.results });
        if(prevProps.choices !== this.props.choices)
            this.setState({ choices: this.props.choices.results });
        if(prevProps.choices.results.length !== this.props.choices.results.length)
            this.COLORS = RandomColor.randomColor({luminosity: 'dark',count: this.props.choices.results.length});
    }
    render(){
        return(
            <ResponsiveContainer height={270} width='100%'>
                <PieChart width={730} height={270}>
                    <Legend verticalAlign="top" height={10}/>
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