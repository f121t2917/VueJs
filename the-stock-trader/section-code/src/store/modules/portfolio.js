// 個人投資組合 
const state = {
    funds: 10000, // 現金
    stocks: []
};

// 個人投資組合 method
const mutations = {
    // 購買股票
    'BUT_STOCK'(state, {stockId, quantity, stockPrice}) {
        // 判斷投資組合中是否有該檔股票
        const record = state.stocks.find(element => element.id == stockId);
        if (record) {
            record.quantity += quantity;
        } else {
            state.stocks.push({
                id: stockId,
                quantity: quantity
            });
        }
        state.funds -= stockPrice * quantity;
    },
    // 賣出股票
    'SELL_STOCK'(state, {stockId, quantity, stockPrice}) {
        // 判斷投資組合中是否有該檔股票
        const record = state.stocks.find(element => element.id == stockId);
        if (record.quantity > quantity) { // 如果投資組合中數量 > 賣出股 則扣除數量
            record.quantity -= quantity;
        } else {
            // 從投資組合中 移除 
            state.stocks.splick(state.stocks.indexOf((record), 1));
        }
        // 未考慮 賣出股 > 持股
        state.funds += stockPrice * quantity;
    },
    // 設定個人投資組合資料
    'SET_PORTFOLIO' (state, portfolio) {
        state.funds = portfolio.funds;
        state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
    }
};

const actions = {
    // 賣出股票
    sellStock({ commit }, order) {
        commit('SELL_STOCK', order);
    },
};

const getters = {
    // 個人投資組合的股票 的現值
    stockPortfolio(state, getters) { // getters 為 modules/stocks 中的 getters
        // state.stocks 為 市上的股票
        return state.stocks.map(stock => {
            const record = getters.stocks.find(element => element.id == stock.id);
            return {
                id: stock.id,
                quantity: stock.quantity, // 個人投資組合的股票數量
                name: record.name, // 目前市上股票的名稱 
                price: record.price // 目前市上股票的價格
            }
        });
    },
    // 取得目前的現金
    funds (state) {
        return state.funds;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}