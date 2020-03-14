import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { adminRouter } from '../../router';
import logo from './logo.png';
import './Frame.css'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// import { Frame } from '..';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
// @withRouter;

const menus = adminRouter.filter(route => route.isNav === true);

// @withRouter
  
class Frame extends Component {

  onMenuClick = (e) => {
    // console.log(e, '<-e->');
  } 

  render() {

    const selectedKeyArr = this.props.location.pathname.split('/')
    selectedKeyArr.length = 3

    return (
      <div style={{height: '100%'}}>
        <Layout style={{minHeight: '100%'}}>
          <Header className="header ko-header">
            <div className='ko-logo'>
              <img src={logo} alt='logo' />
            </div>
      {/* <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu> */}
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          onClick={this.onMenuClick}
          selectedKeys={[selectedKeyArr.join('/')]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {/* <SubMenu
            key="sub1"
            title={
              <span>
                <UserOutlined />
                subnav 1
              </span>
            }
          > */}
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
            {/* <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item> */}
          {/* </SubMenu> */}
          {/* <SubMenu
            key="sub2"
            title={
              <span>
                <LaptopOutlined />
                subnav 2
              </span>
            }
          >
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu> */}
          {/* <SubMenu
            key="sub3"
            title={
              <span>
                <NotificationOutlined />
                subnav 3
              </span>
            }
          >
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
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
