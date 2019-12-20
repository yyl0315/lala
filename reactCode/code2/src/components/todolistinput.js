import React, { Component } from 'react'

export default class todolistinput extends Component {
    render() {
        return (
            <div>
                <input onChange={this.props.message} value={this.props.value}></input><button onClick={this.props.add}>添加</button>
            </div>
        )
    }
}
