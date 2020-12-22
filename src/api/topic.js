import axios from 'axios'

// 将json数据转换成formData
const parseFormData = (params) => {
    const data = new FormData()
    for (const key in params) {
      data.append(key, params[key])
    }
    return data
  }
  
  export const selectTopic = params => {
    return axios.get('/api/topic/select_topics',  { params: params })       // 获取全部文章
  }

  export const updateTopic = params => {
      return axios.post('/api/topic/update_topic', parseFormData(params))   // 更新文章内容
  }