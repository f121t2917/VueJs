import Vue from 'vue';

// 將抓取網路資料 拉出來
export const loadData = ({ commit }) => {
    Vue.http.get('data.json')
        .then(response => response.json())
        .then(data => {
            if (data) {
                const stocks = data.stocks; // 個股資料
                const funds = data.funds; // 現金
                const stockPortfolio = data.stockPortfolio; // 個人投資組合

                const portfolio = {
                    stockPortfolio,
                    funds
                };

                commit('SET_STOCKS', stocks); // 利用 store 設定股票資料
                commit('SET_PORTFOLIO', portfolio); // 設定 個人投資組合
            }
        });
};