import React, { Component } from 'react'
import Todolistdata from './todolistdata'
import Todolistinput from './todolistinput'
export default class todolist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
            message:[]
        }
    }
    valuechange = (e) => {
        // console.log(e.target.value)
        this.setState({
            value: e.target.value
        })
    }
    add = () => {
        let tmp = JSON.parse(JSON.stringify(this.state.message))
        tmp.push(this.state.value)
        this.setState({
            message:tmp,
            value:''
        })
        // console.log(tmp)
    }
    del=(i)=>{
        console.log(i)
        let tmp = JSON.parse(JSON.stringify(this.state.message))
        tmp.splice(i,1)
        this.setState({
            message:tmp
        })
    }
    render() {
        return (
            <div>
                <Todolistinput add={this.add} value={this.state.value} message={this.valuechange} />
                <Todolistdata message={this.state.message} del={this.del} />
               

            </div>
        )
    }
}
