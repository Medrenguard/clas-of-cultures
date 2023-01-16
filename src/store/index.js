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
    stage: 'readyToGame', // beforeStart, start, changeColor, readyToGame
    opponents: {
      player: {
        color: undefined,
        nation: undefined
      },
      AI: {
        color: undefined,
        nation: undefined
      }
    },
    layout: {
      my: {
        city: [
          {
            id: 1,
            destroyed: false,
            onEventCard: false, // поселение находится на карточке события
            region: 10,
            tile: 1,
            mood: 'happy', // happy, neutral, angry
            buildings: [
              // {
              //   id: 1,
              //   type: 'temple',
              //   destroyed: false,
              //   onEventCard: false, // здание находится на карточке события
              //   owner: 'creator' // creator, enemy, rebel ; TODO: переопределить
              // }
            ]
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
            mood: 'happy', // happy, neutral, angry
            buildings: []
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
    },
    updateStage (state, newValue) {
      state.stage = newValue
    },
    updateOpponentsColor (state, payload) {
      state.opponents.player.color = payload.player
      state.opponents.AI.color = payload.AI
    }
  },
  actions: {
  },
  modules: {
  }
})
