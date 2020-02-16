// data modules 處理 stocks 資料
import stocks from '../../data/stocks';

const state = {
    stocks: []
};

// 股票 method
const mutations = {
    // 將  data/stocks 存到 state.stocks
   'SET_STOCKS' (state, stocks) {
        state.stocks = stocks;
    },
    'RND_STOCKS' (state) { // 股價變動
        state.stocks.forEach(stock => {
            stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
        });
    }
};

const actions = {
    buyStock: ({ commit }, order) => {
        // 呼叫 portfolio 的 BUT_STOCK
        // 從這傳到 portfolio 可以直接帶該股票的資料過去
        commit('BUT_STOCK', order);
    },
    initStocks: ({ commit }, order) => {
        commit('SET_STOCKS', stocks);
    },
    randomizeStocks: ({ commit }) => {
        commit('RND_STOCKS');
    }
};

const getters = {
    stocks: state => {
        return state.stocks;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}