import axios from 'axios'

// const isDev = process.env.NODE_ENV = 'development'

const service = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/176929'
})

const service1 = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/176929'
})

service.interceptors.request.use((config) => {
  config.data = Object.assign({}, config.data, {
    authToken: 'kotoba'
  })
  return config
})

service.interceptors.response.use((res) => {
  if (res.data.code === 200) {
    return res.data.data
  } else {
    // TODO 全局错误处理
  }
})
// 获取文章列表
export const getArticles = (offset = 0, limited = 0) => {
  return service.post('/api/v1/articleList', {
    offset,
    limited
  })
}

// 删除文章
export const deleteArticle = (id) => {
  return service.post(`/api/v1/articleDelete/${id}`)
}

// 获取单篇文章
export const getArticleById = (id) => {
  return service.post(`/api/v1/article/${id}`)
}
// 修改文章
export const saveArticle = (id, data) => {
  return service.post(`/api/v1/articleEdit/${id}`, data)
}

// 获取文章阅读量
export const getArticleAmount = () => {
  return service.post('/api/v1/articleAmount')
}

// 获取通知列表
export const getNotifications = () => {
  return service.post('/api/v1/notifications')
}

// 登录接口
export const login = (userInfo) => {
  return service1.post('/api/v1/login', userInfo)
}

// return axios.post('http://rap2api.taobao.org/app/mock/176929/api/v1/articleList', {
//     authToken: 'kotoba'
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });