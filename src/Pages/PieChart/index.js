import React from 'react';
import {PieChart,Pie, Cell} from 'recharts'
import {getPieChartPlots} from '../../services/plots';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export default class PieChartComp extends React.Component{
  state={
    data:[]
  }
  async componentWillMount(){
    let plots = await getPieChartPlots();
    if(!plots)
      return;
    console.log(plots);
    plots = plots.map((plot,index)=>{
      return {
        "name": "Slice "+(index+1),
        "value" : plot
      }
    });
    this.setState({data:plots});
  }
    render = () => (<div>
        
        <section>
            <h1>Pie Chart</h1>             
          <PieChart width={730} height={300}>
            <Pie labelLine
          data={this.state.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label>
             {this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          </PieChart>
        </section>
    </div>)
}