import actionType from '../actions/actionTypes'
import actionTypes from '../actions/actionTypes';

const isLogin = Boolean(window.localStorage.getItem('authToken')) || Boolean(window.sessionStorage.getItem('authToken'))

const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || JSON.parse(window.sessionStorage.getItem('userInfo'))

const initState = {
  ...userInfo,
  isLogin,
  isLoading: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionType.START_LOGIN:
      return {
        ...state.type,
        isLoading: false,
      }
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.userInfo,
        isLogin: true,
        isLoading: false,
      }
    case actionType.LOGIN_FAILED:
      // initState = {}
      return {
        id: '',
        displayName: '',
        avatar: '',
        role: '',
        isLoading: false,
        isLogin: false
      }
    case actionTypes.CHANGE_AVATAR:
      return {
        ...state,
        avatar: action.payload.avatarUrl
      }
    default:
      return state
  }
}