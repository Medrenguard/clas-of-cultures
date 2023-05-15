<template>
  <g class="region-wrap"
    :class=" { underFog : isRegionUnderFog }">
    <path
      transform="translate(-50.614968,-78.206734)"
      d="m 25.101981,82.540149 h 5.004623 l 2.501898,-4.333415 h 4.995404 l 2.500702,4.331343 h 5.004168 l 2.501339,4.332444 -2.499794,4.329769 H 40.11 l -2.501561,4.332829 h -4.999525 l -2.49833,-4.327236 h -4.99691 l -2.498706,-4.327888 z"
      class="region-item" />
    <template>
      <tile-item v-for="(item, i) in getRegionWithOrientation(this.mapTilesInRegion[region_info.region_type])" :key="i+1" :numberRegion="numberRegion" :numberTile="i+1" :orientation="region_info.orientation" :type="item.type" :positionTile="item.translate" :transform="giveTranslateAttr(item.translate, item.type)"/>
    </template>
  </g>
</template>

<script>
import tileItem from '@/components/onMap/tileItem.vue'
import { mapState } from 'vuex'

export default {
  name: 'regionItem',
  components: { tileItem },
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
    getRegionWithOrientation (region) {
      if (this.region_info.orientation === 'avers') { return region }
      if (this.region_info.orientation === 'revers') { return this.getReverseRegion(region) }
    },
    getReverseRegion (region) {
      const reversedRegion = region.map(function (el) {
        let res
        if (el.translate === 'top') { res = 'bottom' }
        if (el.translate === 'bottom') { res = 'top' }
        if (el.translate === 'left') { res = 'right' }
        if (el.translate === 'right') { res = 'left' }
        return { type: el.type, translate: res }
      })
      return reversedRegion
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
    }
  },
  computed: {
    ...mapState([
      'mapTilesInRegion'
    ]),
    isRegionUnderFog () {
      return this.region_info.region_type === 0
    }
  }
}
</script>

<style lang="scss">
.underFog .tile-item {
  stroke-width: 0;
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
}
</style>
