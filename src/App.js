import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
// import { NotFound } from './views'
import { Frame } from './components'
import { adminRouter } from './router'

export default class App extends Component {
  render() {
    return (
      // <div>
        <Frame>
          <Switch>
          {
          adminRouter.map(route => {
            return <Route exact={route.exact} key={route.pathname} path={route.pathname} render={(routerProps) => {
              return <route.component {...routerProps} />
            }} />
            })
            }
            <Redirect to={adminRouter[0].pathname} from='/admin' exact={true} />
            <Redirect to='/404' />
            </Switch>
          </Frame>
      // </div>
    )
  }
}