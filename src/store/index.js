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
    mapTilesInRegion: { // Общий справочник регионов
      0: [// регион под туманом
        { type: 'fog', translate: 'top' },
        { type: 'fog', translate: 'left' },
        { type: 'fog', translate: 'right' },
        { type: 'fog', translate: 'bottom' }
      ],
      1: [// стандартный стартовый регион
        { type: 'wasteland', translate: 'top' },
        { type: 'mountains', translate: 'left' },
        { type: 'forest', translate: 'right' },
        { type: 'field', translate: 'bottom' }
      ], // далее идут регионы с присвоением реального номера из игры(кроме специальных стартовых: для них резерв 2,3,4)
      5: [
        { type: 'sea', translate: 'top' },
        { type: 'mountains', translate: 'left' },
        { type: 'sea', translate: 'right' },
        { type: 'mountains', translate: 'bottom' }
      ],
      6: [
        { type: 'sea', translate: 'top' },
        { type: 'sea', translate: 'left' },
        { type: 'mountains', translate: 'right' },
        { type: 'field', translate: 'bottom' }
      ],
      7: [
        { type: 'forest', translate: 'top' },
        { type: 'forest', translate: 'left' },
        { type: 'sea', translate: 'right' },
        { type: 'sea', translate: 'bottom' }
      ],
      8: [
        { type: 'field', translate: 'top' },
        { type: 'sea', translate: 'left' },
        { type: 'forest', translate: 'right' },
        { type: 'sea', translate: 'bottom' }
      ],
      9: [
        { type: 'forest', translate: 'top' },
        { type: 'mountains', translate: 'left' },
        { type: 'mountains', translate: 'right' },
        { type: 'sea', translate: 'bottom' }
      ],
      10: [
        { type: 'mountains', translate: 'top' },
        { type: 'sea', translate: 'left' },
        { type: 'field', translate: 'right' },
        { type: 'mountains', translate: 'bottom' }
      ],
      11: [
        { type: 'sea', translate: 'top' },
        { type: 'field', translate: 'left' },
        { type: 'forest', translate: 'right' },
        { type: 'mountains', translate: 'bottom' }
      ],
      12: [
        { type: 'forest', translate: 'top' },
        { type: 'sea', translate: 'left' },
        { type: 'field', translate: 'right' },
        { type: 'forest', translate: 'bottom' }
      ],
      13: [
        { type: 'field', translate: 'top' },
        { type: 'sea', translate: 'left' },
        { type: 'wasteland', translate: 'right' },
        { type: 'mountains', translate: 'bottom' }
      ],
      14: [
        { type: 'sea', translate: 'top' },
        { type: 'wasteland', translate: 'left' },
        { type: 'forest', translate: 'right' },
        { type: 'field', translate: 'bottom' }
      ],
      15: [
        { type: 'sea', translate: 'top' },
        { type: 'field', translate: 'left' },
        { type: 'field', translate: 'right' },
        { type: 'wasteland', translate: 'bottom' }
      ],
      16: [
        { type: 'field', translate: 'top' },
        { type: 'sea', translate: 'left' },
        { type: 'field', translate: 'right' },
        { type: 'wasteland', translate: 'bottom' }
      ],
      17: [
        { type: 'mountains', translate: 'top' },
        { type: 'forest', translate: 'left' },
        { type: 'mountains', translate: 'right' },
        { type: 'wasteland', translate: 'bottom' }
      ],
      18: [
        { type: 'forest', translate: 'top' },
        { type: 'mountains', translate: 'left' },
        { type: 'field', translate: 'right' },
        { type: 'mountains', translate: 'bottom' }
      ],
      19: [
        { type: 'field', translate: 'top' },
        { type: 'forest', translate: 'left' },
        { type: 'mountains', translate: 'right' },
        { type: 'field', translate: 'bottom' }
      ],
      20: [
        { type: 'forest', translate: 'top' },
        { type: 'field', translate: 'left' },
        { type: 'field', translate: 'right' },
        { type: 'field', translate: 'bottom' }
      ]
    },
    // stageLoop: [
    //   'beforeStart',
    //   'start',
    //   'changeColor',
    //   'colorChanged',
    //   'changeFirstPlayer',
    //   'firstPlayerChanged',
    //   'readyToGame',
    //   'MOVING_waitingSelection', // этап после нажатия кнопки "Передвижение" для выбора юнитов
    //   'MOVING_selectingTile' // формирование выбрано и курсор наведен на другой тайл(TODO: до которого формирование может дойти)
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
      units: [
        {
          id: 1,
          type: 'settler',
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
          type: 'settler',
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
          type: 'settler',
          alive: true,
          died_in_battle: false,
          founded_the_city: false,
          region: 1,
          tile: 4,
          owner: 'AI',
          selected: false,
          canMove_onThisAction: true,
          canMove_onThisRound: true
        },
        {
          id: 4,
          type: 'infantry',
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
          id: 5,
          type: 'infantry',
          alive: true,
          region: 10,
          tile: 3,
          owner: 'player',
          selected: false,
          canMove_onThisAction: true,
          canMove_onThisRound: true,
          canAttack: true
        },
        {
          id: 6,
          type: 'infantry',
          alive: true,
          region: 1,
          tile: 4,
          owner: 'AI',
          selected: false,
          canMove_onThisAction: true,
          canMove_onThisRound: true,
          canAttack: true
        }
        // {
        //   id: 7,
        //   type: 'ship',
        //   alive: true,
        //   region: 10,
        //   tile: 4,
        //   owner: 'player',
        //   selected: false,
        //   canMove_onThisAction: true,
        //   canMove_onThisRound: true,
        //   canAttack: true
        // },
        // {
        //   id: 8,
        //   type: 'ship',
        //   alive: true,
        //   region: 1,
        //   tile: 4,
        //   owner: 'AI',
        //   selected: false,
        //   canMove_onThisAction: true,
        //   canMove_onThisRound: true,
        //   canAttack: true
        // }
      ]

    },
    collectionPoint: { // локация(регион/тайл) выбранных в данный момент юнитов
      region: null,
      tile: null
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
    LIVING_UNITS (state) {
      return state.layout.units.filter(unit => unit.alive === true)
    },
    GET_UNIT_BY_ID: (state) => (payload) => {
      return state.layout.units.find(unit => unit.id === payload)
    },
    SELECTED_UNITS (state) {
      return state.layout.units.filter(unit => unit.selected === true)
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
    reverseUnitSelection (state, unitId) {
      const u = state.layout.units.find(unit => unit.id === unitId)
      u.selected = !u.selected
    },
    updateCollectionPoint (state, newValue) {
      state.collectionPoint = newValue
    },
    unitMovement (state, payload) { // id юнита, регион и тайл
      const unit = state.layout.units.find(unit => unit.id === payload.id)
      unit.region = payload.region
      unit.tile = payload.tile
      unit.selected = false
      unit.canMove_onThisAction = false
      // тут добавить логику: при попадении в леса - canAttack = false, в горы - canMove_onThisRound = false
    }
  },
  actions: {
    toggleUnitSelection (context, unitId) {
      context.commit('reverseUnitSelection', unitId)
      // если при выделении нет точки сбора - проставить её(будет корректно работать, если параметр selected у юнитов не будет сохраняться при перезагрузке)
      if (context.state.collectionPoint.region === null) {
        const unit = context.state.layout.units.find(unit => unit.id === unitId)
        context.commit('updateCollectionPoint', { region: unit.region, tile: unit.tile })
      }
    },
    formationMovement (context, target) {
      context.getters.SELECTED_UNITS.forEach(unit => {
        context.commit('unitMovement', { ...target, id: unit.id })
      })
      context.commit('updateStage', 'MOVING_waitingSelection')
    }
  },
  modules: {
  }
})
