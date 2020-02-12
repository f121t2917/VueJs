import * as types from '../types';
const state = {
    counter: 0
};

const getters = {
    // doubleCounter: state => {
    [types.DOUBLE_COUNTER]: state => {
        return state.counter * 2;
    },
    [types.CLICK_COUNTER]: state => {
        return state.counter + ' Clicks'
    },
};

const mutations = {
    increment: state => {
        state.counter++;
    },
    decrement: (state, payload) => { // 從 actions 傳 參數進來
        state.counter -= payload;
    },
}

const actions = {
    increment: context => { // context 為 vuex 自動傳遞，讓我們能夠訪問 commit 方法
        context.commit('increment');
    },
    decrement: ({ commit }, payload) => { // 可以單獨解構 commit ，可傳參數 payload
        commit('decrement', payload);
    },
    asyncIncrement: ({ commit }) => {
        setTimeout(() => {
            commit('increment');
        }, 1000);
    },
    asyncDecrement: ({ commit }) => {
        setTimeout(() => {
            commit('decrement');
        }, 1000);
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}