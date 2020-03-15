import React, { Component } from 'react'
import { Card } from 'antd'

export default class NoAuth extends Component {
  render() {
    return (
      <Card>
        没有权限访问此页面
      </Card>
    )
  }
}
