import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import { NotFound } from './views'
import { Frame } from './components'
import { adminRouter } from './router'

const mapState = state => ({
  isLogin: state.users.isLogin,
  role: state.users.role
})

@connect(mapState)
class App extends Component {
  render() {
    return (
      this.props.isLogin
      ?
      // <div>
        <Frame>
          <Switch>
          {
          adminRouter.map(route => {
            return (
              <Route
                exact={route.exact}
                key={route.pathname}
                path={route.pathname}
                render={(routerProps) => {
                  const hasPermission = route.roles.includes(this.props.role)
                  return hasPermission
                    ?
                    <route.component {...routerProps} />
                    :
                    <Redirect to='/admin/noauth' />
              }} />
            )
            })
            }
            <Redirect to={adminRouter[0].pathname} from='/admin' exact={true} />
            <Redirect to='/404' />
            </Switch>
        </Frame>
        :
        <Redirect to='/login'/>
      // </div>
    )
  }
}
export default App