import axios from 'axios'

// 将json数据转换成formData
const parseFormData = (params) => {
    const data = new FormData()
    for (const key in params) {
      data.append(key, params[key])
    }
    return data
  }

  export const uploadMotto = params => {
      return axios.post('/api/motto/upload_motto', parseFormData(params))  // 上传座右铭
  }

  export const getMottos = params => {
    return axios.get('/api/motto/get_mottos', { params: params })  // 获取全部座右铭
  }

  export const delMottos = params => {
    return axios.post('/api/motto/del_motto', parseFormData(params))  // 删除某一条座右铭
  }