// npm install --save vuex
// store 太大 可創建 modules 資料夾 折成不能的 module
import Vue from 'vue';
import Vuex from 'vuex';
import counter from './modules/counter'; // 將 counter 拆出來

// 載入 actions 所有
// 有可能因為過多的變數名稱，可以利用命名空間
// vue 2.1 以上 可以使用 Module Namespacing
import * as actions from './actions';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        // 折到 modules/couter.js
        // counter: 0, // 利用 vuex store 初始化 counter，讓各個 component 使用
        value: 0
    },
    getters: { // 利用 getters 另外處理成員的值
        // doubleCounter: state => {
        //     return state.counter * 2;
        // },
        // stringCounter: state => {
        //     return state.counter + ' Clicks'
        // },
        value: state => {
            return state.value;
        }

    },
    mutations: {
        // 需同步執行
        // increment: state => {
        //     state.counter++;
        // },
        // decrement: (state, payload) => { // 從 actions 傳 參數進來
        //     state.counter -= payload;
        // },
        updateValue: (state, payload) => {
            state.value = payload;
        }
    },
    actions, // 拆到 actions.js
    // actions: {
        // Action 提交的是 mutation，而不是直接變更狀態或值
        // Action 可以包含任意異步操作
        // increment: context => { // context 為 vuex 自動傳遞，讓我們能夠訪問 commit 方法
        //     context.commit('increment');
        // },
        // decrement: ({ commit }, payload) => { // 可以單獨解構 commit ，可傳參數 payload
        //     commit('decrement', payload);
        // },
        // asyncIncrement: ({ commit }) => {
        //     setTimeout(() => {
        //         commit('increment');
        //     }, 1000);
        // },
        // asyncDecrement: ({ commit }) => {
        //     setTimeout(() => {
        //         commit('decrement');
        //     }, 1000);
        // },
        // 把 action 拆到 modules/actions.js
        // updateValue({ commit }, payload) {
        //     commit('updateValue', payload);
        // }
    // },
    modules: { // 載入 modules counter
        counter
    }
});