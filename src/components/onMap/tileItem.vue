<template>
    <g>
        <g :transform="transform">
            <terrain-item :type="type"/>
        </g>
        <g v-if="myCityInThisTile.length">
            <city-item :transform="giveTranslateAttr('city')" :cityInfo="myCityInThisTile[0]"/>
        </g>
        <g v-if="rivalCityInThisTile.length">
            <city-item :transform="giveTranslateAttr('city')" :cityInfo="rivalCityInThisTile[0]"/>
        </g>
        <g v-if="mySettlersInThisTile.length">
            <settler-item v-for="(settler, i) in mySettlersInThisTile" :key="i+1" :transform="giveTranslateAttr('settler', i)" :settlerID="settler"/>
        </g>
        <g v-if="rivalSettlersInThisTile.length">
            <settler-item v-for="(settler, i) in rivalSettlersInThisTile" :key="i+1" :transform="giveTranslateAttr('settler', i)" :settlerID="settler"/>
        </g>
        <g v-if="myInfantryInThisTile.length">
            <infantry-item v-for="(infantry, i) in myInfantryInThisTile" :key="i+1" :transform="giveTranslateAttr('infantry', i)" :infantryID="infantry"/>
        </g>
        <g v-if="rivalInfantryInThisTile.length">
            <infantry-item v-for="(infantry, i) in rivalInfantryInThisTile" :key="i+1" :transform="giveTranslateAttr('infantry', i)" :infantryID="infantry"/>
        </g>
        <g v-if="myShipsInThisTile.length">
            <ship-item v-for="(ship, i) in myShipsInThisTile" :key="i+1" :transform="giveTranslateAttr('ship', i)" :shipID="ship"/>
        </g>
        <g v-if="rivalShipsInThisTile.length">
            <ship-item v-for="(ship, i) in rivalShipsInThisTile" :key="i+1" :transform="giveTranslateAttr('ship', i)" :shipID="ship"/>
        </g>
    </g>
</template>

<script>
import terrainItem from '@/components/onMap/onTile/terrainItem.vue'
import cityItem from '@/components/onMap/onTile/cityItem.vue'
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
      if (elType === 'city') { // рисуется не через матрицу на данный момент
        return `translate(${res.toString()})`
      } else {
        return `matrix(${res.toString()})`
      }
    },
    calcTranslateAttr (position, elType, elNumber) {
      // TODO: нужно добавить логику отрисовки на морских тайлах, т.к. на них нет предела военного присутствия, т.е. 4 корабля могут везти 8 сухопутных юнитов
      let res = []
      // при изменении размеров тайлов - изменить значения смещения
      const shiftTile = { x: 7.5, y: 4.35 }
      // смещение для отрядов
      const shiftUnit = 1.25
      // стартовая точка юнитов на svg-шке
      const startPoint = {
        city: { x: 0, y: 0 },
        settler: { x: -6.7424739, y: -9.033277 },
        ship: { x: -6.7424739, y: -10.364462 },
        infantry: { x: -6.7206329, y: -7.6900277 }
      }
      // при перерисовке - изменить значения
      const matrixValue = {
        city: [], // рисуется не через матрицу на данный момент
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
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'MY_CITIES',
      'RIVAL_CITIES',
      'MY_SETTLERS',
      'RIVAL_SETTLERS',
      'MY_INFANTRY',
      'RIVAL_INFANTRY',
      'MY_SHIPS',
      'RIVAL_SHIPS'
    ]),
    myCityInThisTile () {
      const res = []
      for (let i = 0; i < this.MY_CITIES.length; i++) {
        if (this.MY_CITIES[i].region === this.numberRegion && this.MY_CITIES[i].tile === this.numberTile) {
          res.push({ id: this.MY_CITIES[i].id, mood: this.MY_CITIES[i].mood })
        }
      }
      return res
    },
    rivalCityInThisTile () {
      const res = []
      for (let i = 0; i < this.RIVAL_CITIES.length; i++) {
        if (this.RIVAL_CITIES[i].region === this.numberRegion && this.RIVAL_CITIES[i].tile === this.numberTile) {
          res.push({ id: this.RIVAL_CITIES[i].id, mood: this.RIVAL_CITIES[i].mood })
        }
      }
      return res
    },
    mySettlersInThisTile () {
      const res = []
      for (let i = 0; i < this.MY_SETTLERS.length; i++) {
        if (this.MY_SETTLERS[i].region === this.numberRegion && this.MY_SETTLERS[i].tile === this.numberTile) {
          res.push(this.MY_SETTLERS[i].id)
        }
      }
      return res
    },
    rivalSettlersInThisTile () {
      const res = []
      for (let i = 0; i < this.RIVAL_SETTLERS.length; i++) {
        if (this.RIVAL_SETTLERS[i].region === this.numberRegion && this.RIVAL_SETTLERS[i].tile === this.numberTile) {
          res.push(this.RIVAL_SETTLERS[i].id)
        }
      }
      return res
    },
    myInfantryInThisTile () {
      const res = []
      for (let i = 0; i < this.MY_INFANTRY.length; i++) {
        if (this.MY_INFANTRY[i].region === this.numberRegion && this.MY_INFANTRY[i].tile === this.numberTile) {
          res.push(this.MY_INFANTRY[i].id)
        }
      }
      return res
    },
    rivalInfantryInThisTile () {
      const res = []
      for (let i = 0; i < this.RIVAL_INFANTRY.length; i++) {
        if (this.RIVAL_INFANTRY[i].region === this.numberRegion && this.RIVAL_INFANTRY[i].tile === this.numberTile) {
          res.push(this.RIVAL_INFANTRY[i].id)
        }
      }
      return res
    },
    myShipsInThisTile () {
      const res = []
      for (let i = 0; i < this.MY_SHIPS.length; i++) {
        if (this.MY_SHIPS[i].region === this.numberRegion && this.MY_SHIPS[i].tile === this.numberTile) {
          res.push(this.MY_SHIPS[i].id)
        }
      }
      return res
    },
    rivalShipsInThisTile () {
      const res = []
      for (let i = 0; i < this.RIVAL_SHIPS.length; i++) {
        if (this.RIVAL_SHIPS[i].region === this.numberRegion && this.RIVAL_SHIPS[i].tile === this.numberTile) {
          res.push(this.RIVAL_SHIPS[i].id)
        }
      }
      return res
    }
  }
}
</script>

<style scoped lang="scss">

</style>
