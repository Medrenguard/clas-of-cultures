<template>
  <g>
    <path
      :transform="giveTranslateAttr('cell')"
      d="M 7.494359,12.996442 9.9947349,8.6656632 h 4.9958081 l 2.501396,4.3325488 -2.498864,4.328161 H 9.9960809 Z"
      class="tile"
      sodipodi:insensitive="true" />
    <g :transform="transform">
        <terrain-item :type="type"/>
    </g>
    <city-item v-if="cityInThisTile !== false" :transform="giveTranslateAttr('city')" :cityInfo="cityInThisTile" :colorClass="getColorElement(cityInThisTile.owner)"/>
    <g v-if="livingSettlersInThisTile.length">
        <settler-item v-for="(settler, i) in livingSettlersInThisTile" :key="i+1" :transform="giveTranslateAttr('settler', i)" :settlerID="settler.id" :settleryOwner="settler.owner" :colorClass="getColorElement(settler.owner)"/>
    </g>
    <g v-if="livingInfantryInThisTile.length">
        <infantry-item v-for="(infantry, i) in livingInfantryInThisTile" :key="i+1" :transform="giveTranslateAttr('infantry', i)" :infantryID="infantry.id" :infantryOwner="infantry.owner" :colorClass="getColorElement(infantry.owner)"/>
    </g>
    <g v-if="livingShipsInThisTile.length">
        <ship-item v-for="(ship, i) in livingShipsInThisTile" :key="i+1" :transform="giveTranslateAttr('ship', i)" :shipID="ship.id" :shipOwner="ship.owner" :colorClass="getColorElement(ship.owner)"/>
    </g>
  </g>
</template>

<script>
import terrainItem from '@/components/onMap/onTile/terrainItem.vue'
import cityItem from '@/components/onMap/onTile/city/cityItem.vue'
import settlerItem from '@/components/onMap/onTile/units/settlerItem.vue'
import infantryItem from '@/components/onMap/onTile/units/infantryItem.vue'
import shipItem from '@/components/onMap/onTile/units/shipItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'tileItem',
  components: {
    terrainItem,
    cityItem,
    settlerItem,
    infantryItem,
    shipItem
  },
  props: {
    numberRegion: Number,
    numberTile: Number,
    orientation: String,
    positionTile: String,
    type: String,
    transform: String
  },
  methods: {
    giveTranslateAttr (elType, elNumber = 0) {
      const res = this.calcTranslateAttr(this.positionTile, elType, elNumber)
      if (['city', 'cell'].includes(elType)) { // рисуется не через матрицу на данный момент
        return `translate(${res.toString()})`
      } else {
        return `matrix(${res.toString()})`
      }
    },
    calcTranslateAttr (position, elType, elNumber) {
      // TODO: нужно добавить логику отрисовки на морских тайлах, т.к. на них нет предела военного присутствия, т.е. 4 корабля могут везти 8 сухопутных юнитов
      let res = []
      // при изменении размеров тайлов - изменить значения смещения
      const shiftTile = { x: 7.5, y: 4.33 }
      // смещение для отрядов
      const shiftUnit = 1.25
      // стартовая точка юнитов на svg-шке
      const startPoint = {
        city: { x: -28, y: 0 },
        cell: { x: -28, y: 0 },
        settler: { x: -34.7424739, y: -9.033277 },
        ship: { x: -34.7424739, y: -10.364462 },
        infantry: { x: -34.7206329, y: -7.6900277 }
      }
      // при перерисовке - изменить значения
      const matrixValue = {
        city: [], // рисуется не через матрицу на данный момент
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
      // возвращает позицию со сдвигом относительно положения тайла и, если нужно, кол-ва юнитов на тайле
      return [...matrixValue[elType], res[0] - shiftUnit * elNumber, res[1]]
    },
    getColorElement (_owner) {
      return this.PLAYER_COLORS[_owner] + 'SVG'
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'PLAYER_COLORS',
      'CITIES',
      'LIVING_SETTLERS',
      'LIVING_INFANTRY',
      'LIVING_SHIPS'
    ]),
    cityInThisTile () {
      for (let i = 0; i < this.CITIES.length; i++) {
        if (this.CITIES[i].region === this.numberRegion && this.CITIES[i].tile === this.numberTile) {
          return { id: this.CITIES[i].id, mood: this.CITIES[i].mood, owner: this.CITIES[i].owner }
        }
      }
      return false
    },
    livingSettlersInThisTile () {
      const res = []
      for (let i = 0; i < this.LIVING_SETTLERS.length; i++) {
        if (this.LIVING_SETTLERS[i].region === this.numberRegion && this.LIVING_SETTLERS[i].tile === this.numberTile) {
          res.push({ id: this.LIVING_SETTLERS[i].id, owner: this.LIVING_SETTLERS[i].owner })
        }
      }
      return res
    },
    livingInfantryInThisTile () {
      const res = []
      for (let i = 0; i < this.LIVING_INFANTRY.length; i++) {
        if (this.LIVING_INFANTRY[i].region === this.numberRegion && this.LIVING_INFANTRY[i].tile === this.numberTile) {
          res.push({ id: this.LIVING_INFANTRY[i].id, owner: this.LIVING_INFANTRY[i].owner })
        }
      }
      return res
    },
    livingShipsInThisTile () {
      const res = []
      for (let i = 0; i < this.LIVING_SHIPS.length; i++) {
        if (this.LIVING_SHIPS[i].region === this.numberRegion && this.LIVING_SHIPS[i].tile === this.numberTile) {
          res.push({ id: this.LIVING_SHIPS[i].id, owner: this.LIVING_SHIPS[i].owner })
        }
      }
      return res
    }
  }
}
</script>

<style scoped lang="scss">
.tile {
  fill:none;stroke:#000000;
  stroke-width:0.05px;
  stroke-linecap:butt;
  stroke-linejoin:miter;
  stroke-opacity:1
}
</style>
