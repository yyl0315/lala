import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    // 数据
    state: {
        info: '',
        jrgwc: []
    },
    // 操作
    mutations: {
        setjrgwc(state, data) {
            state.jrgwc.push(data)
        }
    },
    // 方法
    actions: {

    }

})