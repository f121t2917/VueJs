import Vue from 'vue';
import Vuex from 'vuex';

// 載入 stocks modules (modules include stock data)
import stocks from './modules/stocks';
import portfolio from './modules/portfolio';

import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    modules: {
        stocks,
        portfolio
    }
});

