import React, { Component } from 'react'

export default class App extends Component {
  // 构造器
  constructor(props) {
    super(props)
    // 定义数据
    this.state = {
      name: '高原',
      age: 21
    }
  }
  // old = () => {
  //   this.setState({
  //     age: this.state.age + 1
  //   })
  // }
  // oldj = () => {
  //   this.setState({
  //     age: this.state.age - 1
  //   })
  // }
  // 渲染
  render() {
    return (
      // <div>
      //  名字：{this.state.name}
      //  年龄：<button onClick={this.oldj}>-1</button>{this.state.age}
      //  <button onClick={this.old}>+1</button>
      // </div>
      <div>
        名字：{this.state.name}
        年龄：<button onClick={() => {
          this.setState({
            age: this.state.age - 1
          })
        }}>-1</button>{this.state.age}
        <button onClick={() => {
          this.setState({
            age: this.state.age + 1
          })
        }}>+1</button>
      </div>
    )
  }
}

