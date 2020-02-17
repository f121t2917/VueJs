import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth';
import globalAxios from 'axios';

import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    // 將資料存到 state
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      console.log(user);
      state.user = user;
    },
    clearAuthData (state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: { // firebase 的 auth 是註冊使用者用及驗證取得 token， 正確會將資料存到 firebase database
    signup ({ commit, dispatch }, authData) { // 註冊 firebase 的 auth，另外載入 dispatch
      axios.post('/accounts:signUp?key=AIzaSyAbJS2uUYG-fJ55bWIGOJC58l5UDVSEZ10', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
          .then(res => {
            console.log(res);
            commit('authUser', {
              token: res.data.idToken,
              userId: res.data.localId
            });
            dispatch('storeUser', authData); // 呼叫 下方的 storeUser
          })
          .catch(error => console.log(error))
    },
    login ({ commit }, authData) {  // 登入
      axios.post('/accounts:signInWithPassword?key=AIzaSyAbJS2uUYG-fJ55bWIGOJC58l5UDVSEZ10', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
          .then(res => { 
            console.log(res)
            commit('authUser', {
              token: res.data.idToken,
              userId: res.data.localId
            });
          })
          .catch(error => console.log(error))
    },
    logout ({ commit }) {
      commit('clearAuthData');
      router.replace('/signin'); // 登出轉向登入頁面
    },
    storeUser ({ commit, state }, userData) { // 將資料存到 firebase 的 database
      // check 是否有 token 
      if (!state.idToken) {
        return;
      }
      // 附加 auth token
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
      // 附加 auth token
    fetchUser ({ commit, state }) { // 取得 users
      if (!state.idToken) {
        return;
      }
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          console.log(users)
          commit('storeUser', users[0]); // commit 是執行 mutations 的 storeUser，dispatch 是執行 actions
          // this.email = users[0].email
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    user (state) {
      return state.user;
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
})