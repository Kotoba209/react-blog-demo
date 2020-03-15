import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { adminRouter } from '../../router';
import logo from './logo.png';
import './Frame.less'
import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Badge,
} from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import { getNotificationList } from '../../actions/notifications'
import { logout } from '../../actions/users'
// import { Frame } from '..';
const { Header, Content, Sider } = Layout;
// @withRouter;

const menus = adminRouter.filter(route => route.isNav === true);

const mapState = state => {
  return {
    notificationsCount: state.notifications.list.filter(val => val.hasRead === false).length,
    avatar: state.users.avatar,
    displayName: state.users.displayName
  }
}

// @withRouter
@connect(mapState, { getNotificationList, logout })
class Frame extends Component {

  componentDidMount() {
    this.props.getNotificationList()
  }

  onMenuClick = ({ key }) => {
    this.props.history.push(key)
  }

  onDropDownMenuClick = ({key}) => {
    if (key === '/logout') {
      this.props.logout()
    } else {
      this.props.history.push(key)
    }
  }

  render() {
    const menu = (
      <Menu onClick={this.onDropDownMenuClick}>
        <Menu.Item
          key='/admin/notifications'
        >
          <Badge dot={Boolean(this.props.notificationsCount)}>
            通知中心
          </Badge>
        </Menu.Item>
        <Menu.Item
        key='/admin/profile'
        >
          <Badge>
            个人设置
          </Badge>
        </Menu.Item>
        <Menu.Item
        key='/logout'
        >
          <Badge>
            退出
          </Badge>
        </Menu.Item>
      </Menu>
    );

    const selectedKeyArr = this.props.location.pathname.split('/')
    selectedKeyArr.length = 3

  return (
  <div style={{height: '100%'}}>
  <Layout style={{minHeight: '100%'}}>
    <Header className="header ko-header">
      <div className='ko-logo'>
        <img src={logo} alt='logo' />
      </div>

      <Dropdown overlay={menu} placement="bottomCenter">
        <div className='tips'>
        <Badge count={this.props.notificationsCount}>
          <Avatar size="large" src={this.props.avatar} />
        </Badge>
              <span className='nickName'>欢迎您！{this.props.displayName}</span>
        </div>
      </Dropdown>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          onClick={this.onMenuClick}
          selectedKeys={[selectedKeyArr.join('/')]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
            menus.map(route => {
              return (
                <Menu.Item key={route.pathname}>
                  <Link to={route.pathname}>
                    {route.title}
                  </Link>
                </Menu.Item>
              )
          })
          }
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
          }}
        >
          {this.props.children}
        </Content>
      </Layout>
    </Layout>
  </Layout>,
  </div>
    )
  }
}

export default withRouter(Frame);
