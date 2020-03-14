import React, { Component, createRef } from 'react'
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
} from 'antd'

import E from 'wangeditor'

import './edit.css'

@Form.create()

class ArticleEdit extends Component {

  constructor() {
    super()
    this.editorRef = createRef()
    this.state = {
      content: ' ',
    }
  }

  initEditor = () => {
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = (html) => {
      // html 即变化之后的内容
      this.setState({
        content: html,
      })
      // that.props.form.setFieldsValue({
      //   content: html
      // })
  }
    this.editor.create()
  }

  componentDidMount() {
    this.initEditor()
  }

  render() {
    console.log(this, '<-this->');

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

    const tailLayout = {
      wrapperCol: { offset:6 },
    };

    const onFinish = values => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    function onChange(value, dateString) {
      console.log('Selected Time: ', value);
      console.log('Formatted Selected Time: ', dateString);
    }
    
    function onOk(value) {
      console.log('onOk: ', value);
    }

    return (
      <div>
        <Card
          title="文章编辑"
          bordered={false}
          extra={<Button onClick={this.toExcel}
          >返回
          </Button>}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入标题!' }]}
            >
              <Input placeholder='请输入标题' />
            </Form.Item>
            <Form.Item
              label="作者"
              name="author"
              rules={[{ required: true, message: '请输入作者名称!' }]}
            >
              <Input placeholder='作者' />
            </Form.Item>
            <Form.Item
              label="阅读量"
              name="amount"
              rules={[{ required: true, message: '请输入阅读量!' }]}
            >
              <Input placeholder='请输入阅读量' />
            </Form.Item>
            <Form.Item
              label="创建时间"
              name="createAt"
              rules={[{ required: true, message: '请选择时间!' }]}
            >
              <DatePicker showTime onChange={onChange} onOk={onOk} />
            </Form.Item>
            <Form.Item
              label="内容"
              name={this.state.content}
              rules={[{ required: true, message: '请输入内容!' }]}
            >
              {/* <Input placeholder='请输入阅读量' /> */}
              <div className='bl' ref={this.editorRef}></div>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button size='large' type="primary" htmlType="submit">
                保存修改
              </Button>
            </Form.Item>
            </Form>
        </Card>
      </div>
    )
  }
}

export default ArticleEdit
