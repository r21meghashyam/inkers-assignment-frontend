import React from 'react';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import './style.css';
import { toast } from '../../utils/reducers';
import { login } from '../../services/plots';
import {Redirect} from 'react-router-dom';

export default class Login extends React.Component{
    BUTTON_NORMAL = "Login";
    BUTTON_ONCLICK = "Logging in..."
    state={
        buttonName: this.BUTTON_NORMAL
    }
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    async handleSubmit(e){
        e.preventDefault();
        if(!this.state.username)
            return toast("Please enter username");
        if(!this.state.password)
            return toast("Please enter password");
        await this.setState({buttonName:this.BUTTON_ONCLICK});
        if(await login(this.state.username,this.state.password))
           this.setState({redirect:true});
        else
            this.setState({buttonName:this.BUTTON_NORMAL});
    }
    render(){
        
        if(this.state.redirect)
            return (<Redirect to="/"/>);

        return(<div className="loginBox">
        <form onSubmit={this.handleSubmit}>
            <h1>AUTHENTICATE</h1>
            <Input type="text" name="username" onChange={this.handleChange} label="Username"/>
            <Input type="password" name="password" onChange={this.handleChange} label="Password"/>
            <Button disabled={this.state.buttonName===this.BUTTON_ONCLICK}>{this.state.buttonName}</Button>
        </form>
    </div>)

    }
}