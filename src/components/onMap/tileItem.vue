<template>
  <g class="tile-wrap"
  @click="clickTile"
  @mouseover="mouseoverTile"
  @mouseleave="mouseleaveTile">
    <g :transform="transform" class="terrain-item" v-if="type !== 'fog'">
      <terrain-item :type="type"/>
    </g>
    <path
      :transform="giveTranslateAttr('cell')"
      d="M 7.494359,12.996442 9.9947349,8.6656632 h 4.9958081 l 2.501396,4.3325488 -2.498864,4.328161 H 9.9960809 Z"
      class="tile-item selection-frame"
      data-type-object="tile"
      :data-region="numberRegion"
      :data-tile="numberTile"
      :data-orientation="orientation"
      :data-position="positionTile"
      :data-type="type" />
    <city-item v-if="cityInThisTile !== false" :transform="giveTranslateAttr('city')" :cityInfo="cityInThisTile" :colorClass="getColorElement(cityInThisTile.owner)"/>
    <g v-if="getUnitsInThisTile.length" class="units-container">
      <unit-item v-for="(unit, i) in getUnitsInThisTile" :key="i+1" :transform="giveTranslateAttr(unit.type, unit.id)" :unitID="unit.id" :colorClass="getColorElement(unit.owner)" :selected="unit.selected" :canMove="unit.canMove"/>
    </g>
  </g>
</template>

<script>
import terrainItem from '@/components/onMap/onTile/terrainItem.vue'
import cityItem from '@/components/onMap/onTile/city/cityItem.vue'
import unitItem from '@/components/onMap/onTile/units/unitItem.vue'
import { mapState, mapGetters } from 'vuex'
import exploringMixin from '../../mixins/exploringMixin.js'

export default {
  name: 'tileItem',
  components: {
    terrainItem,
    cityItem,
    unitItem
  },
  props: {
    numberRegion: Number,
    numberTile: Number,
    orientation: String,
    positionTile: String,
    type: String,
    transform: String
  },
  mixins: [exploringMixin],
  methods: {
    giveTranslateAttr (elType, unitId = 0) {
      const res = this.calcTranslateAttr(this.positionTile, elType, unitId)
      if (['cell'].includes(elType)) { // рисуется не через матрицу на данный момент
        return `translate(${res.toString()})`
      } else {
        return `matrix(${res.toString()})`
      }
    },
    calcTranslateAttr (position, elType, unitId) {
      // TODO: нужно добавить логику отрисовки на морских тайлах, т.к. на них нет предела военного присутствия, т.е. 4 корабля могут везти 8 сухопутных юнитов
      let res = []
      // при изменении размеров тайлов - изменить значения смещения
      const shiftTile = { x: 7.5, y: 4.33 }
      // смещение для отрядов
      const shiftUnit = 1.25
      // стартовая точка юнитов на svg-шке
      const startPoint = {
        city: { x: -29.5, y: -1.7 },
        cell: { x: -28, y: 0 },
        settler: { x: -34.7424739, y: -9.033277 },
        ship: { x: -34.7424739, y: -10.364462 },
        infantry: { x: -34.7206329, y: -7.6900277 }
      }
      // при перерисовке - изменить значения
      const matrixValue = {
        city: [1.179, 0, 0, 1.179],
        cell: [], // рисуется не через матрицу на данный момент
        settler: [1.4512788, 0, 0, 1.4509685],
        ship: [1.4512788, 0, 0, 1.4509685],
        infantry: [1.4497717, 0, 0, 1.4497717]
      }
      // при перерисовке тайлов - возможно, изменить логику смещения
      if (position === 'bottom') { res = [startPoint[elType].x, startPoint[elType].y] }
      if (position === 'top') { res = [startPoint[elType].x, startPoint[elType].y - shiftTile.y * 2] }
      if (position === 'left') { res = [startPoint[elType].x - shiftTile.x, startPoint[elType].y - shiftTile.y] }
      if (position === 'right') { res = [startPoint[elType].x + shiftTile.x, startPoint[elType].y - shiftTile.y] }
      const finalShiftPoints = ['cell', 'city'].includes(elType) ? 0 : this.getUnitsInThisTile.filter(unit => unit.type === elType).findIndex(unit => unit.id === unitId)
      // возвращает позицию со сдвигом относительно положения тайла и, если нужно, кол-ва юнитов на тайле
      return [...matrixValue[elType], res[0] - shiftUnit * finalShiftPoints, res[1]]
    },
    getColorElement (_owner) {
      return this.PLAYER_COLORS[_owner] + 'Color'
    },
    mouseoverTile (event) {
      const tile = event.target.closest('.tile-wrap').querySelector('.selection-frame')
      if (this.IS_SELECTED_FLEET) {
        if (!this.thisIsCollectionPoint && this.thisInWaterArea) {
          if (this.stage === 'MOVING_waitingSelection') {
            this.$store.commit('updateStage', 'MOVING_selectingTile')
          }
          if (this.stage === 'MOVING_selectingTile') {
            tile.classList.add('hover')
          }
          if (this.stage === 'MOVING_shipsMoveAfterExploring' && this.thisWaterOnExploringRegion) {
            tile.classList.add('hover')
          }
        } else {
          if (this.stage === 'MOVING_selectingTile') {
            this.$store.commit('updateStage', 'MOVING_waitingSelection')
          }
        }
      } else {
        if (this.isNearToCollectionPoint && (!this.thisIsSea || this.peopleCanBoard)) {
          if (this.stage === 'MOVING_waitingSelection') {
            this.$store.commit('updateStage', 'MOVING_selectingTile')
          }
          if (this.stage === 'MOVING_selectingTile') {
            tile.classList.add('hover')
          }
        } else {
          if (this.stage === 'MOVING_selectingTile') {
            this.$store.commit('updateStage', 'MOVING_waitingSelection')
          }
        }
      }
    },
    mouseleaveTile (event) {
      const tile = event.target.querySelector('.selection-frame')
      if (this.stage === 'MOVING_selectingTile' || this.stage === 'MOVING_shipsMoveAfterExploring') {
        tile.classList.remove('hover')
      }
    },
    clickTile (event) {
      const tile = event.target.closest('.tile-wrap')?.querySelector('.selection-frame')
      if (this.stage === 'MOVING_selectingTile') {
        if (this.type === 'fog') {
          this.exploring(this.numberRegion, this.numberTile)
        }
      } else if (this.stage === 'MOVING_shipsMoveAfterExploring' && this.thisWaterOnExploringRegion) {
        this.$store.dispatch('formationMovement', { region: this.numberRegion, tile: this.numberTile })
        tile.classList.remove('hover')
        this.$store.commit('updateShipExploringData', {})
        this.$store.commit('updateStage', 'MOVING_waitingSelection')
      }
    }
  },
  mounted () {
  },
  computed: {
    ...mapState([
      'stage',
      'collectionPoint',
      'shipExploringData'
    ]),
    ...mapGetters([
      'PLAYER_COLORS',
      'CITIES',
      'LIVING_UNITS',
      'SELECTED_UNITS',
      'GET_NEAREST_TILES',
      'GET_WATER_AREA'
    ]),
    cityInThisTile () {
      for (let i = 0; i < this.CITIES.length; i++) {
        if (this.CITIES[i].region === this.numberRegion && this.CITIES[i].tile === this.numberTile) {
          return { id: this.CITIES[i].id, mood: this.CITIES[i].mood, owner: this.CITIES[i].owner }
        }
      }
      return false
    },
    getUnitsInThisTile () {
      const res = []
      this.LIVING_UNITS.forEach(unit => {
        if (unit.region === this.numberRegion && unit.tile === this.numberTile) {
          res.push({ id: unit.id, type: unit.type, owner: unit.owner, selected: unit.selected, canMove: unit.canMove_onThisAction })
        }
      })
      return res
    },
    isNearToCollectionPoint () {
      return this.GET_NEAREST_TILES(this.collectionPoint.region, this.collectionPoint.tile).find(place => (place.region === this.numberRegion && place.tile === this.numberTile)) !== undefined
    },
    thisIsSea () {
      return this.type === 'sea'
    },
    thisIsCollectionPoint () {
      return this.numberRegion === this.collectionPoint.region && this.numberTile === this.collectionPoint.tile
    },
    thisInWaterArea () {
      return this.GET_WATER_AREA(this.collectionPoint.region, this.collectionPoint.tile).find(tile => tile.region === this.numberRegion && tile.tile === this.numberTile) !== undefined
    },
    thisWaterOnExploringRegion () {
      return this.thisIsSea && this.shipExploringData.regionNum === this.numberRegion
    },
    ourShipsCountOnTile () {
      return this.getUnitsInThisTile.filter(unit => unit.type === 'ship' && unit.owner === 'player').length
    },
    peopleCanBoard () {
      // 1 корабль вмещает до 2 юнитов
      const peopleOnBoard = this.getUnitsInThisTile.filter(unit => unit.type !== 'ship').length
      return (this.SELECTED_UNITS.length + peopleOnBoard) / 2 <= this.ourShipsCountOnTile
    }
  }
}
</script>

<style scoped lang="scss">
.tile-item {
  fill: none;
  stroke:#000000;
  stroke-width:0.05px;
  stroke-linecap:butt;
  stroke-linejoin:miter;
  stroke-opacity:1;
  &.hover ~ * {
    cursor: pointer;
  }
}
</style>
