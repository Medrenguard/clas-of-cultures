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
        color: 'red',
        nation: undefined,
        achivements: [/** TODO **/]
      },
      AI: {
        color: 'blue',
        nation: undefined,
        achivements: [/** TODO **/]
      }
    },
    layout: {
      city: [
        {
          id: 1,
          destroyed: false,
          onEventCard: false, // поселение находится на карточке события
          region: 10,
          tile: 1,
          mood: 'happy', // happy, neutral, angry
          owner: 'player' // player, AI, rebels
        },
        {
          id: 2,
          destroyed: false,
          region: 1,
          tile: 4,
          mood: 'happy', // happy, neutral, angry
          owner: 'AI' // player, AI, rebels
        }
      ],
      buildings: [
        // {
        //   id: 1,
        //   cityId: 1,
        //   type: 'temple',
        //   destroyed: false,
        //   onEventCard: false, // здание находится на карточке события
        //   owner: 'player' // player, AI, rebels ; TODO: переопределить
        // }
      ],
      settlers: [
        {
          id: 1,
          alive: true,
          died_in_battle: false,
          founded_the_city: false,
          region: 10,
          tile: 1,
          owner: 'player'
        },
        {
          id: 2,
          alive: true,
          died_in_battle: false,
          founded_the_city: false,
          region: 1,
          tile: 4,
          owner: 'AI'
        }
      ],
      infantry: [
        // {
        //   id: 1,
        //   alive: true,
        //   region: 10,
        //   tile: 1,
        //   owner: 'player'
        // }
      ],
      ships: []
    },
    regionItemsOnMap: []
    //

  },
  getters: {
    PLAYER_COLORS (state) {
      const res = {}
      for (const key in state.opponents) {
        res[key] = state.opponents[key].color
      }
      return res
    },
    MY_CITIES (state) {
      return state.layout.city.filter(city => city.owner === 'player' && city.destroyed === false)
    },
    RIVAL_CITIES (state) {
      return state.layout.city.filter(city => city.owner === 'AI' && city.destroyed === false)
    },
    MY_SETTLERS (state) {
      return state.layout.settlers.filter(unit => unit.owner === 'player' && unit.alive === true)
    },
    RIVAL_SETTLERS (state) {
      return state.layout.settlers.filter(unit => unit.owner === 'AI' && unit.alive === true)
    },
    LIVING_INFANTRY (state) {
      return state.layout.infantry.filter(unit => unit.alive === true)
    },
    MY_SHIPS (state) {
      return state.layout.ships.filter(unit => unit.owner === 'player' && unit.alive === true)
    },
    RIVAL_SHIPS (state) {
      return state.layout.ships.filter(unit => unit.owner === 'AI' && unit.alive === true)
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
