import axios from 'axios'

// const isDev = process.env.NODE_ENV = 'development'

const service = axios.create({
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

// return axios.post('http://rap2api.taobao.org/app/mock/176929/api/v1/articleList', {
//     authToken: 'kotoba'
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });