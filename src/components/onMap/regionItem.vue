<template>
  <g class="region-wrap"
    :class=" { underFog : isRegionUnderFog }"
    @mouseover="mouseoverRegion"
    @mouseleave="mouseleaveRegion"
    @click="clickRegion">
    <path
      transform="translate(-50.614968,-78.206734)"
      d="m 25.101981,82.540149 h 5.004623 l 2.501898,-4.333415 h 4.995404 l 2.500702,4.331343 h 5.004168 l 2.501339,4.332444 -2.499794,4.329769 H 40.11 l -2.501561,4.332829 h -4.999525 l -2.49833,-4.327236 h -4.99691 l -2.498706,-4.327888 z"
      class="region-item" />
    <template>
      <tile-item v-for="(item, i) in GET_ORIENTED_REGION(region_info.region_type, region_info.orientation)" :key="i+1" :numberRegion="numberRegion" :numberTile="i+1" :orientation="region_info.orientation" :type="item.type" :positionTile="item.translate" :transform="giveTranslateAttr(item.translate, item.type)"/>
    </template>
    <rotation-region-block
      v-if="regionCanRotate"
      :numberRegion="numberRegion"
      :region_type="region_info.region_type"
      :orientation="region_info.orientation"
      transform="translate(-27.3, 0)"/>
  </g>
</template>

<script>
import tileItem from '@/components/onMap/tileItem.vue'
import rotationRegionBlock from '@/components/onMap/rotationRegionBlock.vue'
import { mapState, mapGetters } from 'vuex'
import exploringMixin from '../../mixins/exploringMixin.js'

export default {
  name: 'regionItem',
  components: { tileItem, rotationRegionBlock },
  mixins: [exploringMixin],
  props: {
    numberRegion: Number,
    region_info: {
      region_type: Number,
      orientation: String
    }
  },
  data () {
    return {}
  },
  methods: {
    giveTranslateAttr (position, tileType) {
      const res = this.calcTranslateAttr(position, tileType)
      return `translate(${res.toString()})`
    },
    calcTranslateAttr (position, tileType) {
      let res = []
      // при изменении размеров тайлов - изменить значения смещения
      const shift = { x: 7.5, y: 4.33 }
      // при перерисовке тайлов - возможно, изменить логику смещения
      switch (position) {
        case 'top':
          if (['field', 'sea'].includes(tileType)) { res = [0, 0] }
          if (tileType === 'forest') { res = [shift.x, -shift.y] }
          if (tileType === 'mountains') { res = [-shift.x, -shift.y] }
          if (tileType === 'wasteland') { res = [0, -shift.y * 2] }
          break
        case 'left':
          if (['field', 'sea'].includes(tileType)) { res = [-shift.x, shift.y] }
          if (tileType === 'forest') { res = [0, 0] }
          if (tileType === 'mountains') { res = [-shift.x * 2, 0] }
          if (tileType === 'wasteland') { res = [-shift.x, -shift.y] }
          break
        case 'right':
          if (['field', 'sea'].includes(tileType)) { res = [shift.x, shift.y] }
          if (tileType === 'forest') { res = [shift.x * 2, 0] }
          if (tileType === 'mountains') { res = [0, 0] }
          if (tileType === 'wasteland') { res = [shift.x, -shift.y] }
          break
        case 'bottom':
          if (['field', 'sea'].includes(tileType)) { res = [0, shift.y * 2] }
          if (tileType === 'forest') { res = [shift.x, shift.y] }
          if (tileType === 'mountains') { res = [-shift.x, shift.y] }
          if (tileType === 'wasteland') { res = [0, 0] }
          break
      }
      return res
    },
    mouseoverRegion (event) {
      const region = event.target.closest('.region-wrap')
      if (this.IS_SELECTED_FLEET && this.thisIsFogNearWaterArea) {
        if (this.stage === 'MOVING_waitingSelection') {
          this.$store.commit('updateStage', 'MOVING_selectingRegion')
        }
        if (this.stage === 'MOVING_selectingRegion') {
          region.classList.add('hover')
        }
      }
    },
    mouseleaveRegion (event) {
      const region = event.target.closest('.region-wrap')
      if (this.IS_SELECTED_FLEET && this.thisIsFogNearWaterArea) {
        if (this.stage === 'MOVING_selectingRegion') {
          this.$store.commit('updateStage', 'MOVING_waitingSelection')
          region.classList.remove('hover')
        }
      }
    },
    clickRegion (event) {
      const tile = event.target.closest('.tile-wrap')?.querySelector('.selection-frame')
      if (this.stage === 'MOVING_selectingRegion') {
        this.exploring(this.numberRegion)
        if (this.thisWaterOnExploringRegion(Number(tile.attributes['data-region'].value), Number(tile.attributes['data-tile'].value)) && !this.regionCanRotate) {
          tile.classList.add('hover')
        }
      }
    },
    thisWaterOnExploringRegion (region, tile) {
      return this.shipExploringData.data[this.shipExploringData.onlyPossibleOrientation].findIndex(water => water.region === region && water.tile === tile) >= 0
    }
  },
  computed: {
    ...mapState([
      'mapTilesInRegion',
      'regionForManualOrientation',
      'stage',
      'collectionPoint',
      'shipExploringData'
    ]),
    ...mapGetters([
      'GET_ORIENTED_REGION',
      'IS_SELECTED_FLEET',
      'GET_FOG_REGIONS_NEAR_WATER_AREA'
    ]),
    isRegionUnderFog () {
      return this.region_info.region_type === 0
    },
    regionCanRotate () {
      return this.regionForManualOrientation === this.numberRegion &&
      (this.stage === 'MOVING_exploringManual' ||
      this.stage === 'MOVING_shipsExploringManualThenChange')
    },
    thisIsFogNearWaterArea () {
      return this.GET_FOG_REGIONS_NEAR_WATER_AREA(this.collectionPoint.region, this.collectionPoint.tile).includes(this.numberRegion)
    }
  }
}
</script>

<style lang="scss">
.underFog {
  .tile-item {
  stroke-width: 0;
  }
  &.hover .tile-item {
    cursor: pointer;
    fill:#b6ad8c;
  }
}
</style>
<style scoped lang="scss">
.region-item {
  fill: none;
  stroke-width: 0.05;
  stroke: black;
  .underFog > & {
    fill:#fff6d5;
  }
  .region-wrap.hover & {
    fill: rgba(255, 196, 0, 0.329)
  }
}
</style>
