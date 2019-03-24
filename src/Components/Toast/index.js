import React,{Component} from 'react';
import {toastStore} from '../../utils/reducers';
import './style.css'

export default class Toast extends Component{
    state={
        animate:"toast",
        message:""
    }
    componentDidMount(){
        toastStore.subscribe(()=>{
            this.setState({
                animate:"toast show",
                message:toastStore.getState().message
            },()=>{
                setTimeout(()=>{
                    this.setState({
                        animate:"toast"
                    })
                },2000)
            })
        })
    }
    render(){
        return(<div className={this.state.animate}>
            {this.state.message}
        </div>);
    }
}