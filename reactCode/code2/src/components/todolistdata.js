import React, { Component } from 'react'

export default class todolistdata extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.message.map((v, i) => {
                        return <li key={i}>{v}----<button onClick={() => { this.props.del(i) }}>删除</button></li>
                    })}
                </ul>
            </div>
        )
    }
}
