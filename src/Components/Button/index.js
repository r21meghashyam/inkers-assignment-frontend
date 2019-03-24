import React,{Component} from 'react';
import './style.css'

export default class Toast extends Component{

    render(){
        return(
            <div className="button">
                <button {...this.props} disabled={this.props.disabled?"disabled":false}>{this.props.children}</button>
            </div>
        );
    }
}