import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
import Img from '../logo.svg'
import { Route, Link } from 'react-router-dom';
import Firstorder from './indexz/firstorder'
import Twoorder from './indexz/twoorder'
import Threeorder from './indexz/threeorder'
import Fourorder from './indexz/fourorder'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class index extends Component {
    logout = () => {
        sessionStorage.removeItem('token')
        this.props.history.push('/login')
    }
    render() {
        return (
            <Layout>
            {/* eslint-disable */}
                <Header className="header">
                    <Row>
                        <Col span={2}>
                            <div className="logo">
                                <img src={Img} alt=''></img>
                            </div>
                        </Col>
                        <Col span={20}>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1">数据管理</Menu.Item>
                                <Menu.Item key="2">订单管理</Menu.Item>
                            </Menu>
                        </Col>
                        <Col span={2}>
                            <a href='#' onClick={this.logout}>退出</a>
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="user" />
                                        管理阶级
                      </span>
                                }
                            >
                                <Menu.Item key="1"><Link to="/firstorder">一阶管理</Link></Menu.Item>
                                <Menu.Item key="2"><Link to="/twoorder">二阶管理</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/threeorder">三阶管理</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/fourorder">四阶管理</Link></Menu.Item>
                            </SubMenu>

                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>数据管理</Breadcrumb.Item>
                            <Breadcrumb.Item>一阶管理</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Route path="/firstorder" component={Firstorder}></Route>
                            <Route path="/twoorder" component={Twoorder}></Route>
                            <Route path="/threeorder" component={Threeorder}></Route>
                            <Route path="/fourorder" component={Fourorder}></Route>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
