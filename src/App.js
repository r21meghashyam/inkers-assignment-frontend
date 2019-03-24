import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Header from './Components/Header';
import BarGraph from './Pages/BarGraph';
import PieChart from './Pages/PieChart';
import Toast from './Components/Toast';
import { getUser } from './services/plots';
import {userStore} from './utils/reducers';

class PrivateRoute extends Component{
  state={
    requireLogin:true
  }
   componentWillMount(){
    let user = getUser();
    if(user)
      this.setState({requireLogin:false})
    this.UNSUBSCRIBE=userStore.subscribe(async ()=>{
      let state = userStore.getState();
      console.log(state);
      await this.setState({requireLogin:state.type==="LOGGED_OUT"})
      console.log(this.state)
    })
  }
  componentWillUnmount(){
    this.UNSUBSCRIBE();
  }
  render(){
    
    if(this.state.requireLogin)
      return(<Redirect to="/login"/>);

    let Component=this.props.component;

    return(<Component/>);
  }
}

class App extends Component {
  render() {
    return (
      <> 
      
        <Router>
        <Header/>
          <section>
          <Switch>
            <PrivateRoute path="/" component={Home} exact/>
            <PrivateRoute path="/bargraph" component={BarGraph}/>
            <PrivateRoute path="/piechart" component={PieChart}/>
            <Route path="/Login" component={Login} />
            <Route component={NotFound} />
          </Switch>
          </section>
          <Toast/>
        </Router>
      
      </>
    );
  }
}

export default App;
