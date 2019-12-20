import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import axios from 'axios'
class login extends Component {
    Submit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values);
                axios.post('/admin/login',values).then(res => {
                    console.log(res)
                    if (res.data.ok === 1) {
                        sessionStorage.setItem('token',res.data.data.token)
                        message.success('登录成功')
                        this.props.history.push('/')
                    }

                })

            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="login-form">
                <Form.Item hasFeedback>
                    {getFieldDecorator('account', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }, { pattern: /^\w{5,18}$/, message: ' 密码必须是6~18位数字、字母、下划线' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={this.Submit} className="login-form-button">登录</Button>
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(login)