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
    setLogoutTimer ({ commit, dispatch }, expirationTime) { // 自動登出
      setTimeout(() => {
        // commit('clearAuthData');
        dispatch('logout');
      },expirationTime * 1000);
    },
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
            // token 有效時間
            const now = new Date();
            const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
            // 儲存登入資訊
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch('storeUser', authData); // 呼叫 下方的 storeUser
            dispatch('setLogoutTimer', res.data.expiresIn); // 設定自動登出時間
          })
          .catch(error => console.log(error))
    },
    login ({ commit, dispatch }, authData) {  // 登入
      axios.post('/accounts:signInWithPassword?key=AIzaSyAbJS2uUYG-fJ55bWIGOJC58l5UDVSEZ10', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
          .then(res => { 
            console.log(res)
            // token 有效時間
            const now = new Date();
            const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
            // 儲存登入資訊
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('expirationDate', expirationDate);
            commit('authUser', {
              token: res.data.idToken,
              userId: res.data.localId
            });
            dispatch('setLogoutTimer', res.data.expiresIn); // 設定自動登出時間
          })
          .catch(error => console.log(error))
    },
    tryAutoLogin ({ commit }) { // 判斷 token 是否過期，無過期則為登入狀態
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const expirationDate = localStorage.getItem('expirationDate');
      const now = new Date();
      if (now >= expirationDate) { // 過期
        return
      }
      // 登入
      const userId = localStorage.getItem('userId');
      commit('authUser', {
        token: token,
        userId: userId
      });

    },
    logout ({ commit }) {
      commit('clearAuthData');
      // 清空資料
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
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