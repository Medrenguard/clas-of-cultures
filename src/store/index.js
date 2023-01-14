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
            id: 1,
            destroyed: false,
            region: 10,
            tile: 1,
            mood: 'happy'
          }
        ],
        settlers: [
          {
            id: 1,
            alive: true,
            died_in_battle: false,
            founded_the_city: false,
            region: 10,
            tile: 1
          }
        ],
        infantry: [
          // {
          //   id: 1,
          //   alive: true,
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
            id: 1,
            destroyed: false,
            region: 1,
            tile: 4,
            mood: 'happy'
          }
        ],
        settlers: [
          {
            id: 1,
            alive: true,
            died_in_battle: false,
            founded_the_city: false,
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
    MY_CITIES (state) {
      return state.layout.my.city.filter(unit => unit.destroyed === false)
    },
    RIVAL_CITIES (state) {
      return state.layout.rival.city.filter(unit => unit.destroyed === false)
    },
    MY_SETTLERS (state) {
      return state.layout.my.settlers.filter(unit => unit.alive === true)
    },
    RIVAL_SETTLERS (state) {
      return state.layout.rival.settlers.filter(unit => unit.alive === true)
    },
    MY_INFANTRY (state) {
      return state.layout.my.infantry.filter(unit => unit.alive === true)
    },
    RIVAL_INFANTRY (state) {
      return state.layout.rival.infantry.filter(unit => unit.alive === true)
    },
    MY_SHIPS (state) {
      return state.layout.my.ships.filter(unit => unit.alive === true)
    },
    RIVAL_SHIPS (state) {
      return state.layout.rival.ships.filter(unit => unit.alive === true)
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
