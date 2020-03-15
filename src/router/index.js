import {
  Dashboard,
  Login,
  NotFound,
  Settings,
  Article,
  ArticleEdit,
  Notifications,
  NoAuth,
  Profile,
} from '../views';

export const mainRouter = [{
  pathname: '/login',
  component: Login
}, {
  pathname: '/404',
  component: NotFound
}]

export const adminRouter = [{
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    icon: 'DashboardOutlined',
    isNav: true,
    roles: ['001', '002', '003']
  },
  {
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    icon: 'SettingOutlined',
    isNav: true,
    roles: ['001']
  },
  {
    pathname: '/admin/notifications',
    component: Notifications,
    title: '个人中心',
    icon: 'SettingOutlined',
    isNav: true,
    roles: ['001', '002', '003']
  },
  {
    pathname: '/admin/noauth',
    component: NoAuth,
    roles: ['001', '002', '003']
  },
  {
    pathname: '/admin/profile',
    component: Profile,
    roles: ['001', '002', '003']
  },
  {
    pathname: '/admin/article',
    component: Article,
    title: '文章管理',
    isNav: true,
    icon: 'UnorderedListOutlined',
    exact: true,
    roles: ['001', '002']
  },
  {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: '文章编辑',
    isNav: false,
    roles: ['001', '002']
  }
]