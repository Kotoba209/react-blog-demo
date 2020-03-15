import actionTypes from './actionTypes'

import { login } from '../request'

const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN
  }
}

const loginSuccess = (userInfo) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      userInfo,
    }
  }
}

const loginFailed = () => {
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('userInfo')
  window.sessionStorage.removeItem('authToken')
  window.sessionStorage.removeItem('userInfo')
  return {
    type: actionTypes.LOGIN_FAILED
  }
}

export const getLogin = (userInfo) => {
  const { remember } = userInfo;
  return dispatch => {
    dispatch(startLogin())
    login(userInfo)
      .then((res) => {
        if (res.data.code === 200) {
          const {
            authToken,
            ...userInfo
          } = res.data.data
          if (remember === true) {
            window.localStorage.setItem('authToken', authToken)
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          } else {
            window.sessionStorage.setItem('authToken', authToken)
            window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
          }
          dispatch(loginSuccess(res.data.data))
        } else {
          dispatch(loginFailed())
        }
    })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(loginFailed())
  }
}

export const changeAvatar = (avatarUrl) => {
  return {
    type: actionTypes.CHANGE_AVATAR,
    payload: {
      avatarUrl
    }
  }
}
