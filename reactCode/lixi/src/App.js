import React, { Component } from 'react'
import Boy from './boy'
export default class App extends Component {
  // 构造器
  constructor(props) {
    super(props)
    // 定义数据
    this.state = {
      boxvalue:false,
      value: '',
      list: [1, 2, 3]
    }
    // this.valuechange = this.valuechange.bind(this)
    // this.add = this.add.bind(this)
    // this.del = this.del.bind(this)
  }
  // 定义一个函数：更新 value 值
  // e：触发这个函数的令牌
  // 其中 e.target 代表触发这个函数的对象
  // valuechange(e) {
  //   // console.log(e.target.value);
  //   this.setState({
  //     value: e.target.value
  //   })
  // }
  valuechange = (e) => {
    // console.log(e.target.value);
    this.setState({
      value: e.target.value
    })
  }
  // 添加
  // add() {
  //   // this.state.list.push(this.setState.value)
  //   this.setState({
  //     list: [...this.state.list, this.state.value],
  //     value: ''
  //   })
  // }
  // add=()=> {
  //   if(this.state.value ===''){
  //     return false
  //   }
  //   this.setState({
  //     list: [...this.state.list, this.state.value],
  //     value: ''
  //   })
  // }
  // 删除
  // del(i) {
  //   // console.log(i)
  //   const setlist = [...this.state.list]
  //   // console.log(setlist)
  //   setlist.splice(i, 1)
  //   this.setState({
  //     list: setlist
  //   })
  // }
  // del = (i) => {
  //   // console.log(i)
  //   const setlist = [...this.state.list]
  //   // console.log(setlist)
  //   setlist.splice(i, 1)
  //   this.setState({
  //     list: setlist
  //   })
  // }
  // 渲染
  render() {
    return (
      <div>
        <input type='text' onChange={this.valuechange} value={this.state.value}></input>
        {/* <button onClick={this.add}>添加</button> */}
        <button onClick={() => {
          if (this.state.value === '') {
            return false
          }
          this.setState({
            list: [...this.state.list, this.state.value],
            value: ''
          })
        }}>添加</button>
        <hr />
        <ul>
          {/* {this.state.list.map((v, i) => {
            return <li key={i}>{v}++++++++++++++++++++++<button onClick={() => { this.del(i) }}>删除</button></li>
          })} */}
          {this.state.list.map((v, i) => {
            return <li key={i}><input type='checkbox'></input>{v}++++++++++++++++++++++<button onClick={
              () => {
                const setlist = [...this.state.list]
                setlist.splice(i, 1)
                this.setState({
                  list: setlist
                })
              }
            }>删除</button></li>
          })}
          <Boy></Boy>
          {/* {this.state.list.map((v, i) => {
            return <li key={i}>{v}++++++++++++++++++++++<button onClick={this.del.bind(v,i)}>删除</button></li>
          })} */}
        </ul>
      </div>
    )
  }
}

