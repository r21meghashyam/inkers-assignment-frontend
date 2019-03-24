import React from 'react';
import {BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Bar, Cell} from 'recharts'
import {getBarGraphPlots} from '../../services/plots';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export default class BarGraph extends React.Component{
  state={
    data:[]
  }
  async componentWillMount(){
    let plots = await getBarGraphPlots();
    if(!plots)
      return;
    console.log(plots);
    plots = plots.map((plot,index)=>{
      return {
        "name": "Bar "+(index+1),
        "points" : plot
      }
    });
    this.setState({data:plots});
  }
    render = () => (<div>
        
        <section>
            <h1>Bar Graph</h1>
            <BarChart width={730} height={250} data={this.state.data} label style={{alignSelf:"center"}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            
            <Bar dataKey="points" fill="#8884d8" >
              {this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Bar>
            </BarChart>
        </section>
    </div>)
}