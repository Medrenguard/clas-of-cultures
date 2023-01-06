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
        infantry: [
          // {
          //   region: 10,
          //   tile: 1
          // }
        ],
        ships: [],
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
        infantry: [],
        ships: [],
        achivements: [/** TODO **/]
      }
    },
    regionItemsOnMap: []
    //

  },
  getters: {
    MY_SETTLERS (state) {
      return state.layout.my.settlers
    },
    RIVAL_SETTLERS (state) {
      return state.layout.rival.settlers
    },
    MY_INFANTRY (state) {
      return state.layout.my.infantry
    },
    RIVAL_INFANTRY (state) {
      return state.layout.rival.infantry
    },
    MY_SHIPS (state) {
      return state.layout.my.ships
    },
    RIVAL_SHIPS (state) {
      return state.layout.rival.ships
    }
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
