import React,{Component} from 'react';
import {NavLink,Link} from 'react-router-dom';
import './style.css'
import { logout, getUser } from '../../services/plots';
import { userStore } from '../../utils/reducers';

export default class Header extends Component{
    state={
        showNav:false
    }
    componentWillMount(){
        userStore.subscribe(()=>{
            this.updateState();
        })
        this.updateState();
    }
    updateState(){
        this.setState({
            showNav:!!getUser()
        });
    }
    render(){
        return(<header>
            <div id="logo"><Link to="/">INKERS</Link></div>
            {
                this.state.showNav?
                <nav>
                    <ul>
                        <li><NavLink to="/bargraph" activeClassName="active">Bar Graph</NavLink></li>
                        <li><NavLink to="/piechart" activeClassName="active">Pie Chart</NavLink></li>
                        <li><NavLink to="#" onClick={logout} >Logout</NavLink></li>
                    </ul>
                </nav>
                :<span className="filler">&nbsp;</span>
            }
           
        </header>);
    }
}