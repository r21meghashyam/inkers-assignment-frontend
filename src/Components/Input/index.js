import React,{Component} from 'react';
import './style.css'

export default class Input extends Component{
    state={
        classList:"input",
        value:""
    }
    constructor(props){
        super(props);
        this.setFocus=this.setFocus.bind(this);
        this.setBlur=this.setBlur.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e){
        
        this.setState({
            value:e.target.value
        },()=>{
            if(this.state.value)
                this.setFocus();
        });
        this.props.onChange&&this.props.onChange(e)
    }
    setFocus(){
        this.setState({
            classList:"input focused"
        });
    }
    setBlur(){
        if(this.state.value.length)
            return;
        this.setState({
            classList:"input"
        });
    }
    render(){
        return(
            <div className={this.state.classList}>
                <label htmlFor={this.props.label}>{this.props.label}</label>
                <input {...this.props} value={this.state.value} autoComplete="off" onChange={this.handleChange} id={this.props.label} onFocus={this.setFocus} onBlur={this.setBlur}/>
            </div>
        );
    }
}