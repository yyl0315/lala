import React, { Component } from 'react'
import img from '../logo.svg'
export default class time extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:new Date().toLocaleString()
        }
        setInterval(()=>{
            this.setState({
                data:new Date().toLocaleString()
            })
        },1000)
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.data}</h1>
                <img src={img} alt='img'></img>
            </div>
        )
    }
}
