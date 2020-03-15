import actionTypes from "./actionTypes";
import { getNotifications } from '../request'

const noticeStart = () => {
  return {
    type: actionTypes.NOTICE_START
  }
}

const noticeFinish = () => {
  return {
    type: actionTypes.NOTICE_FINISH
  }
}

export const readById = (id) => {
  return dispatch => {
    dispatch(noticeStart())
    setTimeout(() => {
      dispatch({
        type: actionTypes.READ_BY_ID,
        payload: {
          id,
        }
      })
      dispatch(noticeFinish())
    }, 2000)
  }
}

export const readAll = () => {
  return dispatch => {
    dispatch(noticeStart())
    setTimeout(() => {
      dispatch({
        type: actionTypes.READ_ALL,
      })
      dispatch(noticeFinish())
    }, 2000)
  }
}

export const getNotificationList = () => {
  return dispatch => {
    dispatch(noticeStart())
    getNotifications()
      .then((res) => {
        dispatch({
          type: actionTypes.RECEIVE_NOTIFICATIONS,
          payload: {
            list: res.list
          }
        })
        dispatch(noticeFinish())
    })
  }
}