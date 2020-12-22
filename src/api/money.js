import axios from 'axios'

// 将json数据转换成formData
const parseFormData = (params) => {
    const data = new FormData()
    for (const key in params) {
      data.append(key, params[key])
    }
    return data
  }
  
export const createMoney = params => {
return axios.get('/api/money/create_money',  parseFormData(params))       // 添加一条记录
}

export const selectMoney = params => {
    return axios.get('/api/money/select_money',  { params: params })       // 获取所有记录
}

export const updateMoney = params => {
    return axios.post('/api/money/update_money', parseFormData(params))   // 修改记录
}