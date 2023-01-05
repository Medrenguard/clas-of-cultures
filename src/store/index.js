import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentCountGamers: 2,
    layoutByCountGamers: {
      2: {
        regionsCount: 10,
        regonsForStart: [1, 10]
      },
      3: {
        regionsCount: 15
      },
      4: {
        regionsCount: 18
      }
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
    }
  },
  actions: {
  },
  modules: {
  }
})
