import React, { Component } from 'react'
import { Card, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios'
import { connect } from 'react-redux'

import { changeAvatar } from '../../actions/users'


@connect('' ,{ changeAvatar })
class Profile extends Component {

  constructor() {
    super()
    this.state = {
      imageUrl: '',
      loading: false
    }
  }

  handleUploadImg = ({file}) => {
    const data = new FormData()
    data.append('Token', '930f908a9ac6873801d9ab2259c86e94e84b3c99:rfQsRoCG6BNj-YzOefvzu4UU2hQ=:eyJkZWFkbGluZSI6MTU4NDI3MDk3NSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzEyOTAwIiwiYWlkIjoiMTY3MTMyOCIsImZyb20iOiJmaWxlIn0=')
    data.append('file' ,file)
    this.setState({
      loading: true
    })
    axios.post('http://up.imgapi.com/', data)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            imageUrl: res.data.linkurl
          })
        }
        this.props.changeAvatar(this.state.imageUrl)
      })
      .catch((err) => {
      console.log(err, '<-err->');
      })
      .finally(() => {
        this.setState({
        loading: false
      })
    })
  }

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">更改头像</div>
      </div>
    );
    return (
      <Card title='个人设置'>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
          showUploadList={false}
          customRequest={this.handleUploadImg}
      >
        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      </Card>
    )
  }
}

export default Profile
