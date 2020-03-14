import {
  Dashboard,
  Login,
  NotFound,
  Settings,
  Article,
  ArticleEdit,
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
}, {
  pathname: '/admin/settings',
  component: Settings,
  title: '设置',
  icon: 'SettingOutlined',
  isNav: true,
}, {
  pathname: '/admin/article',
  component: Article,
  title: '文章管理',
  isNav: true,
  icon: 'UnorderedListOutlined',
  exact: true,
}, {
  pathname: '/admin/article/edit/:id',
  component: ArticleEdit,
  title: '文章编辑',
  isNav: false,
}]