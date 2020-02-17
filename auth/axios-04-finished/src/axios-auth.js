import axios from 'axios'

// 使用 firebase auth rest api
// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
// baseURL: 'https://vuejs-http-4827b.firebaseio.com/'

// 註冊 api
// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
// 登入 api
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
const instance = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance