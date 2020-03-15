import React, { Component } from 'react'
import { Card, Button, List, Badge, Spin } from 'antd'
import { connect } from 'react-redux'

import { readById, readAll } from '../../actions/notifications'

const mapState = state => {
  const {
    list = [],
    isLoading,
  } = state.notifications
  return {
    list,
    isLoading,
  }
}

@connect(mapState, { readById, readAll })
class Notifications extends Component {

  render() {
    return (
      <Spin spinning={this.props.isLoading}>
        <Card
          title="通知中心"
          bordered={false}
          extra={<Button onClick={this.props.readAll.bind(this)}
            disabled={this.props.list.every(item => item.hasRead === true)}
          >全部标记为已读
          </Button>}>
          <List
            itemLayout="horizontal"
            dataSource={this.props.list}
            renderItem={item => (
              <List.Item
                extra={item.hasRead ? null : <Button onClick={this.props.readById.bind(this, item.id)}
                >
                记为已读
                </Button>}
            >
            <List.Item.Meta
              // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
              description={item.desc}
            />
          </List.Item>
          )}
        />,
        </Card>
      </Spin>
    )
  }
}

export default Notifications
