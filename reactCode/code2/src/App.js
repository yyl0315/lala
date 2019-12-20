// import React, { Component } from 'react'
// import Todolist from './components/todolist'
// import Time from './components/time'
// import { BrowserRouter, Route, NavLink } from "react-router-dom";
// export default class App extends Component {
//   render() {
//     return (
//       <div>
//         <BrowserRouter>
//         <NavLink to='/'>todo</NavLink>&nbsp;&nbsp;
//         <NavLink to='/time'>time</NavLink>
//         <hr></hr>
//         <Route path='/' component={Todolist}></Route>
//         <Route path='/time' component={Time}></Route>
//         </BrowserRouter>
//       </div>
//     )
//   }
// }
import React, { Component } from 'react'
import Index from './table/index'
import Login from './table/login'
import { BrowserRouter, Route, Redirect } from "react-router-dom";


export default class App extends Component {
  clogin = (props) => {
    // 判断有没有登录
    let token = sessionStorage.getItem('token')
    // 如果没有登录
    if (token === null) {
      // 就直接跳转到登录页
      return <Redirect to='/login' />
    } else {
      // 登录就跳转到index页面
      return <Index {...props} />
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Route path='/' component={props => this.clogin(props)}></Route>
        <Route path='/login' component={Login}></Route>
      </BrowserRouter>
    )
  }
}

