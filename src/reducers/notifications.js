import actionTypes from '../actions/actionTypes'
import { Item } from 'rc-menu';

const initState = {
  isLoading: false,
  list: [{
      id: 1,
      title: '您有一条通知消息',
      desc: '通知消息内容通知消息内容通知消息内容通知消息内容通知消息内容',
      hasRead: false,
    },
    {
      id: 1,
      title: '您有一条通知消息',
      desc: '通知消息内容通知消息内容通知消息内容通知消息内容通知消息内容',
      hasRead: true,
    },
  ]
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_NOTIFICATIONS:
      return {
        ...state,
        list: action.payload.list
      }
    case actionTypes.NOTICE_START:
    return {
      ...state,
      isLoading: true
      }
    case actionTypes.NOTICE_FINISH:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.READ_BY_ID:
      const newList = state.list.map(val => {
        if (val.id === action.payload.id) {
          val.hasRead = true
        }
        return val
      })
      return {
        ...state,
        list: newList,
      }
    case actionTypes.READ_ALL:
    return {
      ...state,
      list: state.list.map(val => {
        val.hasRead = true
        return val
      })
    }
    default:
      return state;
  }
}
