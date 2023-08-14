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
    nodeList: { // граф, названиями вершин которого является String(numReg) + String(numTile). разбито по кол-ву игроков
      2: {
        11: [12, 13, 14],
        12: [21, 23, 14, 11],
        13: [11, 14, 32, 31],
        14: [11, 12, 23, 41, 32, 13],
        21: [22, 24, 23, 12],
        22: [21, 24],
        23: [12, 21, 24, 42, 41, 14],
        24: [51, 42, 23, 21, 22],
        31: [13, 32, 34, 33],
        32: [13, 14, 41, 43, 34, 31],
        33: [31, 34],
        34: [33, 31, 32, 43, 61],
        41: [14, 23, 42, 44, 43, 32],
        42: [23, 24, 51, 53, 44, 41],
        43: [32, 41, 44, 62, 61, 34],
        44: [41, 42, 53, 71, 62, 43],
        51: [24, 42, 53, 54, 52],
        52: [51, 54],
        53: [42, 51, 54, 72, 71, 44],
        54: [52, 51, 53, 72, 81],
        61: [34, 43, 62, 64, 63],
        62: [43, 44, 71, 73, 64, 61],
        63: [61, 64],
        64: [63, 61, 62, 73, 91],
        71: [44, 53, 72, 74, 73, 62],
        72: [53, 54, 81, 83, 74, 71],
        73: [62, 71, 74, 92, 91, 64],
        74: [71, 72, 83, 101, 92, 73],
        81: [54, 72, 83, 84, 82],
        82: [81, 84],
        83: [72, 81, 84, 102, 101, 74],
        84: [82, 81, 83, 102],
        91: [64, 73, 92, 94, 93],
        92: [73, 74, 101, 103, 94, 91],
        93: [91, 94],
        94: [103, 92, 91, 93],
        101: [102, 104, 103, 92, 74, 83],
        102: [84, 83, 101, 104],
        103: [94, 92, 101, 104],
        104: [102, 101, 103]
      }
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
        { type: 'forest', translate: 'left' },
        { type: 'mountains', translate: 'right' },
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
    //   'MOVING_selectingTile', // пехотное формирование выбрано и курсор наведен на другой тайл, до которого формирование может дойти
    //   'MOVING_selectingRegion', // флот выбран и курсор наведен на неизвестный регион, до которого флот может доплыть
    //   'MOVING_moveThenExploringManual', // этап, на котором юниты делают переход на регион и после этого запускается этап ручного выбора ориентации региона
    //   'MOVING_shipsExploringManualThenChange', // этап, на котором корабли выполняют разведку на регионе, на который потом смогут переместиться в обоих ориентациях и есть выбор тайла для размещения флота, запускается этап ручного выбора ориентации региона
    //   'MOVING_shipsExploringManualThenMoveStrict', // этап, на котором корабли выполняют разведку на регионе, на который потом смогут переместиться в обоих ориентациях и нет выбора тайла для размещения флота, запускается этап ручного выбора ориентации региона
    //   'MOVING_shipsExploringThenChange', // этап, на котором корабли выполняют разведку на регионе, на который потом смогут переместиться, для региона возможна только одна ориентация, есть выбор тайла для размещения флота, выполняется принудительная установка ориентации
    //   'MOVING_shipsExploringThenMoveStrict', // этап, на котором корабли выполняют разведку на регионе, на который потом смогут переместиться, для региона возможна только одна ориентация, нет выбора тайла для размещения флота, выполняется принудительная установка ориентации и подразделения
    //   'MOVING_shipsCantMoveAndTheyExploringManual', // этап, на котором корабли не могут сделать переход на регион из-за того, что в нём нет воды или она недосягаема, запускается этап ручного выбора ориентации региона
    //   'MOVING_exploringManual' // этап ручного выбора ориентации региона
    // ],
    stage: 'readyToGame',
    firstPlayer: 'player',
    whoActNow: 'player',
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
    regionForManualOrientation: null,
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
          tile: 1,
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
          tile: 1,
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
          tile: 1,
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
          tile: 2,
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
    regionItemsOnMap: [ // схема данных
      // {
      //   orientation: 'avers',
      //   region_type: 1
      // },
      // {
      //   orientation: 'avers',
      //   region_type: 0
      // }
    ]

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
    },
    IS_SELECTED_FLEET (state, getters) {
      return getters.SELECTED_UNITS.findIndex(unit => unit.type === 'ship') > -1
    },
    GET_ORIENTED_REGION: (state) => (regionType, orientation) => {
      let region
      if (orientation !== 'revers') {
        region = state.mapTilesInRegion[regionType]
      } else {
        region = state.mapTilesInRegion[regionType].map(function (el) {
          let res
          if (el.translate === 'top') { res = 'bottom' }
          if (el.translate === 'bottom') { res = 'top' }
          if (el.translate === 'left') { res = 'right' }
          if (el.translate === 'right') { res = 'left' }
          return { type: el.type, translate: res }
        }).reverse()
      }
      return region
    },
    GET_TILE_TYPE: (state, getters) => (numReg, numTile, mockup) => { // принимает номер региона и тайла, выложенных на карту, возвращает тип тайла(местность)
      const regionOnMap = state.regionItemsOnMap[numReg - 1] // region_type; orientation
      // mockup - опциональный параметр, принимает номер и тип региона для подстановки для расчёта
      if (mockup?.numReg === numReg) { return getters.GET_ORIENTED_REGION(mockup.region_type, mockup.orientation)[numTile - 1].type }
      const res = getters.GET_ORIENTED_REGION(regionOnMap.region_type, regionOnMap.orientation)[numTile - 1].type
      return res
    },
    GET_UNITS_ON_TILE: (state, getters) => (numReg, numTile) => { // принимает номер региона и тайла, выложенных на карту, возвращает массив юнитов
      const res = getters.LIVING_UNITS.filter(unit => unit.region === numReg && unit.tile === numTile)
      return res
    },
    GET_NEAREST_NODES: (state) => (nodeNum) => { // принимает номер узла; отдаёт массив объектов, содержащих номера узлов
      return state.nodeList[state.currentCountGamers][nodeNum]
    },
    NODE_TO_TILE: (state) => (nodeNum) => { // принимает номер узла; отдаёт объект со свойствами region и tile
      const region = Number(String(nodeNum).slice(0, -1))
      const tile = Number(String(nodeNum).slice(-1))
      return { region: region, tile: tile }
    },
    TILE_TO_NODE: (state) => (numReg, numTile) => { // принимает номера региона и тайла; отдаёт номер узла
      return Number('' + numReg + numTile)
    },
    GET_NEAREST_TILES: (state, getters) => (numReg, numTile) => { // принимает номер региона и тайла; отдаёт массив объектов, содержащих номер региона и тайла; если пришёл null - отдаст пустой массив
      if (numReg === null || numTile === null) { return [] }
      const nodeNum = getters.TILE_TO_NODE(numReg, numTile)
      const nearestNodes = getters.GET_NEAREST_NODES(nodeNum)
      const res = nearestNodes.map(function (el) {
        return getters.NODE_TO_TILE(el)
      })
      return res
    },
    GET_WATER_AREA: (state, getters) => (numReg, numTile, mockup) => { // принимает номер региона, тайла и, опционально, подстановленный регион(TODO: и опцию "Навигация"); отдаёт массив объектов, содержащих номер региона и тайла; если пришёл null - отдаст пустой массив. TODO: должен учитывать врагов на пути
      if (numReg === null || numTile === null || getters.GET_TILE_TYPE(numReg, numTile) !== 'sea') { return [] }
      const waterAreaNodes = [getters.TILE_TO_NODE(numReg, numTile)]
      // рекурсивно добавляет соседние морские узлы в waterAreaNodes
      for (let i = 0; i < waterAreaNodes.length; i++) {
        const waterTile = waterAreaNodes[i]
        const nearestNodes = getters.GET_NEAREST_NODES(waterTile)
        nearestNodes.forEach(nearestNode => {
          const tile = getters.NODE_TO_TILE(nearestNode)
          if (getters.GET_TILE_TYPE(tile.region, tile.tile, mockup) === 'sea' && !waterAreaNodes.includes(nearestNode)) {
            waterAreaNodes.push(nearestNode)
          }
        })
      }
      // Преобразует данные узлов в данные тайлов
      const res = waterAreaNodes.map(function (waterAreaNode) {
        return getters.NODE_TO_TILE(waterAreaNode)
      })
      return res
    },
    GET_FOG_REGIONS_NEAR_WATER_AREA: (state, getters) => (numReg, numTile) => { // принимает номер региона, тайла(TODO: и опцию "Навигация"); отдаёт массив номеров регионов; если пришёл null - отдаст пустой массив.
      if (numReg === null || numTile === null || getters.GET_TILE_TYPE(numReg, numTile) !== 'sea') { return [] }
      const waterAreaNodes = getters.GET_WATER_AREA(numReg, numTile)
      const fogRegions = []
      for (let i = 0; i < waterAreaNodes.length; i++) {
        const waterNode = getters.TILE_TO_NODE(waterAreaNodes[i].region, waterAreaNodes[i].tile)
        const nearestNodes = getters.GET_NEAREST_NODES(waterNode)
        nearestNodes.forEach(nearestNode => {
          const tile = getters.NODE_TO_TILE(nearestNode)
          if (getters.GET_TILE_TYPE(tile.region, tile.tile) === 'fog' && !fogRegions.includes(tile.region)) {
            fogRegions.push(tile.region)
          }
        })
      }
      return fogRegions
    }
  },
  mutations: {
    updateRegionInfo (state, payload) {
      state.regionItemsOnMap.splice(payload.regionNum - 1, 1, payload.info)
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
    unitMovement (state, payload) { // id юнита, регион и тайл; если точка назначения пустая - не перемещать юнит, завершить перемещение
      const unit = state.layout.units.find(unit => unit.id === payload.id)
      if (!!payload.region && !!payload.tile) {
        unit.region = payload.region
        unit.tile = payload.tile
      }
      unit.selected = false
      unit.canMove_onThisAction = false
      // тут добавить логику: при попадении в леса - canAttack = false, в горы - canMove_onThisRound = false
    },
    updateRegionForManualOrientation (state, newValue) {
      state.regionForManualOrientation = newValue
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
    }
  },
  modules: {
  }
})
