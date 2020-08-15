import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    data: '123',
    path: '',
    dataSqrt: 0
  },
  getters: {
    getDataSqrt (state) {
      state.dataSqrt = state.data * state.data
      state.data = state.dataSqrt
      return state.dataSqrt
    }
  },
  mutations: {
    currentPath (state, payload) {
      console.log(payload)
      state.path = payload.path
    },
    showText (state) {
      console.log('show state')
    }
  },
  modules: {
  },
  actions: {
    updateText (context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('showText')
          resolve('sync call finish')
        }, 1000)
      })
    }
  }
})

export default store
