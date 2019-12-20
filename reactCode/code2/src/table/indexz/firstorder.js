import React, { Component } from 'react'
import { Form, Input, Table, Divider, Button, Modal, message, Upload } from 'antd';
import axios from 'axios'
import FormItem from 'antd/lib/form/FormItem';
class firstorder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      uploadimg: '',
      editid: '',
      total: 0,
      page: 1,
      page_size: 6,
      data: [],
      columns: [
        {
          title: '编号',
          dataIndex: 'id',
          // render: id => <a>{id}</a>
        },
        {
          title: '礼物名称',
          dataIndex: 'gift_name',
          render: gift_name => <span>{gift_name}</span>
        },
        {
          title: '礼物图片',
          dataIndex: 'gift_icon',
          align: 'center',
          render: (gift_icon) => <img alt="商品图片" src={gift_icon}></img>
        },
        {
          title: '礼物价格',
          dataIndex: 'price',
          align: 'center',
          render: price => <span>￥{price}元</span>
        },
        {
          title: '操作',
          align: 'center',
          render: (text, record) => (
            <span>
              <Button type="primary" size='small' onClick={() => { this.editdata(record.id) }}>edit</Button>
              <Divider type="vertical" />
              <Button type="danger" size='small' onClick={() => { this.deletedata(record.id) }}>Delete</Button>
            </span>
          )
        }
      ]
    }
  }
  // 数据渲染
  componentDidMount() {
    this.getData()
  }
  // 翻页
  pagechange = (page) => {
    this.setState({
      page
    })
    axios.get(`/admin/gifts?page=${page}&page_size=${this.state.page_size}`).then(res => {
      // console.log(res)
      if (res.data.ok === 1) {
        this.setState({
          data: res.data.data,
          total: res.data.total
        })
      }
    })
  }
  // 删除数据
  deletedata = (id) => {
    Modal.confirm({
      title: '确定删除吗?',
      content: '一旦删除不会恢复',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        axios.delete('/admin/gifts/' + id).then(res => {
          console.log(res)
          if (res.data.ok === 1) {
            message.success('删除成功')
            if (this.state.data.length === 1) {
              this.setState({
                page: this.state.page - 1
              })
              // 获取上一页数据
              this.getData(this.state.page - 1)
            } else {
              this.getData()
            }
          } else {
            message.error(res.data.error)
          }
        })
      }
    });
  }
  //渲染数据
  getData = () => {
    axios.get(`/admin/gifts?page=${this.state.page}&page_size=${this.state.page_size}`).then(res => {
      // console.log(res)
      if (res.data.ok === 1) {
        this.setState({
          data: res.data.data,
          total: res.data.total
        })
      }
    })
  }
  // 修改数据
  editdata = (id) => {
    // alert(id)
    let data = this.state.data.find(v => v.id === id)
    this.props.form.setFieldsValue({
      gift_name: data.gift_name,
      price: data.price
    })
    this.setState({
      editid: id,
      visible: true,
      uploadimg: data.gift_icon
    })
  }
  // 添加礼物
  addgift = () => {
    this.setState({
      visible: true
    })
  }
  // 确定添加
  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state.uploadimg === '') {
          return message.error('礼物必须有实物图片')
        }
        values.gift_icon = this.state.uploadimg
        // console.log(values)
        if (this.state.editid === '') {
          axios.post('/admin/gifts', values).then(res => {
            console.log(res)
            if (res.data.ok === 1) {
              this.setState({
                visible: false,
                uploadimg: '',
                editid: ''
              })
              this.props.form.resetFields()
              this.getData();
            } else {
              message.error(res.data.error)
            }
          })
        }else{
          axios.put('/admin/gifts/'+this.state.editid, values).then(res => {
            console.log(res)
            if (res.data.ok === 1) {
              this.setState({
                visible: false,
                uploadimg: '',
                editid: ''
              })
              this.props.form.resetFields()
              this.getData();
            } else {
              message.error(res.data.error)
            }
          })
        }
      }
    });

  }
  // 添加取消
  handleCancel = () => {
    this.setState({
      visible: false,
      uploadimg: '',
      editid: ''
    })
    this.props.form.resetFields()
  }
  // 上传图片
  upload = info => {
    if (info.file.status === 'done') {
      this.setState({
        uploadimg: info.file.response.data.url
      })
    }
  };
  // eslint-disable-next-line
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="danger" onClick={this.addgift}>添加礼物</Button>
        <br />
        <br />
        <Table className='datalist' rowKey='id' columns={this.state.columns} dataSource={this.state.data} pagination={{
          onChange: this.pagechange,
          total: this.state.total,
          current: this.state.page,
          pageSize: this.state.page_size,
          showTotal: (total, range) => `共有 ${total} 页`
        }} />
        <Modal
          title={this.state.editid === '' ? '添加礼物' : '修改礼物'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item hasFeedback>
              {getFieldDecorator('gift_name', {
                rules: [{ required: true, message: '礼物名称不能为空!' }],
              })(
                <Input
                  placeholder="请输入礼物名称"
                />,
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('price', {
                rules: [{ required: true, message: '礼物价格不能为空!' },
                { pattern: /^\d+(\.\d{1,2})?$/, message: '价格必须是数字' }],
              })(
                <Input
                  placeholder="请输入价格"
                  prefix="￥" suffix="RMB"
                />,
              )}
            </Form.Item>
            <FormItem>
              <Upload
                name="file"
                listType="picture-card"
                showUploadList={false}
                action="http://127.0.0.1:8765/admin/upload"
                headers={{
                  Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }}
                onChange={this.upload}
              >
                {this.state.uploadimg === '' ? '上传图片' : <img style={{ width: '100%' }} src={this.state.uploadimg} alt='' />}
              </Upload>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(firstorder)