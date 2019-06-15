const axios = require('axios')

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8880/api/',
    })

    this.client.interceptors.response.use(
      response => response,
      error => {
        // エラー時の共通処理を記述
        return Promise.reject(error)
      }
    )
  }

  async fetchSuggestions(keyword) {
    const { data: items } = await this.client.get('item/list', {
      params: { keyword },
    })

    return items
  }

  async fetchItem(id) {
    const { data: item } = await this.client.get(`item/${id}`)

    return item
  }
}

export default new ApiService()
