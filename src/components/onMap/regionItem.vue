<template>
  <g class="region-wrap">
    <path v-if="isRegionUnderFog"
      transform="translate(-50.614968,-78.206734)"
      d="m 25.101981,82.540149 h 5.004623 l 2.501898,-4.333415 h 4.995404 l 2.500702,4.331343 h 5.004168 l 2.501339,4.332444 -2.499794,4.329769 H 40.11 l -2.501561,4.332829 h -4.999525 l -2.49833,-4.327236 h -4.99691 l -2.498706,-4.327888 z"
      class="regionUnderFog" />
      <path v-if="isRegionUnderFog"
      transform="translate(-50.614968,-78.206734)"
      d="m 25.101981,82.540149 h 5.004623 l 2.501898,-4.333415 h 4.995404 l 2.500702,4.331343 h 5.004168 l 2.501339,4.332444 -2.499794,4.329769 H 40.11 l -2.501561,4.332829 h -4.999525 l -2.49833,-4.327236 h -4.99691 l -2.498706,-4.327888 z"
      class="selection-frame"
      data-type-object="region"
      :data-region="numberRegion" />
    <template v-else>
      <tile-item v-for="(item, i) in getRegionWithOrientation(mapTilesInRegion[region_info.region_type])" :key="i+1" :numberRegion="numberRegion" :numberTile="i+1" :orientation="region_info.orientation" :type="item.type" :positionTile="item.translate" :transform="giveTranslateAttr(item.translate, item.type)"/>
    </template>
  </g>
</template>

<script>

import tileItem from '@/components/onMap/tileItem.vue'

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
    return {
      // Общий справочник регионов
      mapTilesInRegion: {
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
      }
    }
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
    isRegionUnderFog () {
      return this.region_info.region_type === null
    }
  }
}
</script>

<style scoped lang="scss">
.regionUnderFog {
  fill:#fff6d5;
  stroke-width:0.05;
  stroke: black;
}
</style>
