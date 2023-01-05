import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentCountGamers: 2,
    layoutByCount: {
      regionsCount: null,
      regionsForStart: []
    },
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
    },
    regionItemsOnMap: []
    //

  },
  getters: {
  },
  mutations: {
    updateRegionInfo (state, payload) {
      state.regionItemsOnMap[payload.regionNum] = payload.info
    },
    updateLayoutByCount (state, payload) {
      state.layoutByCount = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
