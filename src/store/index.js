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
    // stageLoop: [
    //   'beforeStart',
    //   'start',
    //   'changeColor',
    //   'colorChanged',
    //   'changeFirstPlayer',
    //   'firstPlayerChanged',
    //   'readyToGame',
    //   'MOVING_waitingSelection'
    // ],
    stage: 'MOVING_waitingSelection',
    firstPlayer: 'player',
    opponents: { // для мультиплеера или большего кол-ва игроков правильнее будет переделать в массив, но для этого нужно будет переписать обращения к объекту
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
    unitCollections: {
      infantry: 'infantry',
      settler: 'settlers',
      ship: 'ships'
    },
    layout: {
      city: [
        {
          id: 1,
          destroyed: false,
          onEventCard: false, // поселение находится на карточке события
          region: 10,
          tile: 4,
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
        {
          id: 1,
          cityId: 2,
          type: 'temple',
          destroyed: false,
          onEventCard: false, // здание находится на карточке события
          owner: 'AI' // player, AI, rebels ; TODO: переопределить
        },
        {
          id: 2,
          cityId: 2,
          type: 'academy',
          destroyed: false,
          onEventCard: false, // здание находится на карточке события
          owner: 'AI' // player, AI, rebels ; TODO: переопределить
        },
        {
          id: 3,
          cityId: 2,
          type: 'castle',
          destroyed: false,
          onEventCard: false, // здание находится на карточке события
          owner: 'AI' // player, AI, rebels ; TODO: переопределить
        },
        {
          id: 4,
          cityId: 2,
          type: 'port',
          destroyed: false,
          onEventCard: false, // здание находится на карточке события
          owner: 'AI' // player, AI, rebels ; TODO: переопределить
        },
        {
          id: 5,
          cityId: 1,
          type: 'temple',
          destroyed: false,
          onEventCard: false, // здание находится на карточке события
          owner: 'player' // player, AI, rebels ; TODO: переопределить
        },
        {
          id: 6,
          cityId: 1,
          type: 'academy',
          destroyed: false,
          onEventCard: false, // здание находится на карточке события
          owner: 'player' // player, AI, rebels ; TODO: переопределить
        },
        {
          id: 7,
          cityId: 1,
          type: 'castle',
          destroyed: false,
          onEventCard: false, // здание находится на карточке события
          owner: 'player' // player, AI, rebels ; TODO: переопределить
        },
        {
          id: 8,
          cityId: 1,
          type: 'port',
          destroyed: false,
          onEventCard: false, // здание находится на карточке события
          owner: 'player' // player, AI, rebels ; TODO: переопределить
        }
      ],
      settlers: [
        {
          id: 1,
          alive: true,
          died_in_battle: false,
          founded_the_city: false,
          region: 10,
          tile: 4,
          owner: 'player',
          selected: false,
          canMove_onThisAction: true,
          canMove_onThisRound: true
        },
        {
          id: 3,
          alive: true,
          died_in_battle: false,
          founded_the_city: false,
          region: 10,
          tile: 4,
          owner: 'player',
          selected: false,
          canMove_onThisAction: true,
          canMove_onThisRound: true
        },
        {
          id: 2,
          alive: true,
          died_in_battle: false,
          founded_the_city: false,
          region: 1,
          tile: 4,
          owner: 'AI',
          selected: false,
          canMove_onThisAction: true,
          canMove_onThisRound: true
        }
      ],
      infantry: [
        {
          id: 1,
          alive: true,
          region: 10,
          tile: 4,
          owner: 'player',
          selected: false,
          canMove_onThisAction: true,
          canMove_onThisRound: true,
          canAttack: true
        },
        {
          id: 2,
          alive: true,
          region: 1,
          tile: 4,
          owner: 'AI',
          selected: false,
          canMove_onThisAction: true,
          canMove_onThisRound: true,
          canAttack: true
        }
      ],
      ships: [
        {
          id: 1,
          alive: true,
          region: 10,
          tile: 4,
          owner: 'player',
          selected: false,
          canMove_onThisAction: true,
          canMove_onThisRound: true,
          canAttack: true
        }
        // {
        //   id: 2,
        //   alive: true,
        //   region: 1,
        //   tile: 4,
        //   owner: 'AI',
        // selected: false,
        // canMove_onThisAction: true,
        // canMove_onThisRound: true,
        // canAttack: true
        // }
      ]
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
    CITIES (state) {
      return state.layout.city.filter(city => city.destroyed === false)
    },
    BUILDINGS (state) {
      return state.layout.buildings.filter(building => building.destroyed === false)
    },
    LIVING_SETTLERS (state) {
      return state.layout.settlers.filter(unit => unit.alive === true)
    },
    LIVING_INFANTRY (state) {
      return state.layout.infantry.filter(unit => unit.alive === true)
    },
    LIVING_SHIPS (state) {
      return state.layout.ships.filter(unit => unit.alive === true)
    },
    GET_UNIT_BY_TYPEnID: (state) => (info) => {
      return state.layout[state.unitCollections[info.type]].find(unit => unit.id === Number(info.id))
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
    },
    updateFirstPlayer (state, newValue) {
      state.firstPlayer = newValue
    },
    toggleUnitSelection (state, info) {
      const u = state.layout[state.unitCollections[info.type]].find(unit => unit.id === Number(info.id)).selected
      state.layout[state.unitCollections[info.type]].find(unit => unit.id === Number(info.id)).selected = !u
    }
  },
  actions: {
  },
  modules: {
  }
})
