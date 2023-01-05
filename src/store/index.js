import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentCountGamers: 2,
    layout: {
      my: {
        city: [
          {
            region: 10,
            tile: 1,
            mood: 'happy'
          }
        ],
        settlers: [
          {
            region: 10,
            tile: 1
          }
        ],
        achivements: [/** TODO **/]
      },
      rival: {
        city: [
          {
            region: 1,
            tile: 4,
            mood: 'happy'
          }
        ],
        settlers: [
          {
            region: 1,
            tile: 4
          }
        ],
        achivements: [/** TODO **/]
      }
    }

  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
