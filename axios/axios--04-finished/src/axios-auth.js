import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://vue-update.firebaseio.com'
})

// axios 預設值
// headers 加 SOMETHING: something
instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance