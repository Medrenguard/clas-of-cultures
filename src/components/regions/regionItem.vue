<template>
    <svg
        width="24.995148mm"
        height="17.376385mm"
        viewBox="0 0 24.995148 17.326385"
        version="1.1"
        id="svg5"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg">
        <!-- TODO: Если не стартовые регионы и еще неразведанные регионы -->
        <template v-if="!startRegions.includes(number)">
            <defs
                id="defs2" />
            <g
                id="layer1"
                transform="translate(-22.614968,-78.206734)">
                <path
                style="fill:#fff6d5;stroke-width:0.05; stroke: black;"
                d="m 25.101981,82.540149 h 5.004623 l 2.501898,-4.333415 h 4.995404 l 2.500702,4.331343 h 5.004168 l 2.501339,4.332444 -2.499794,4.329769 H 40.11 l -2.501561,4.332829 h -4.999525 l -2.49833,-4.327236 h -4.99691 l -2.498706,-4.327888 z"
                id="path1196" />
            </g>
        </template>
        <!-- всего 20 типов регионов, кроме неразведанного -->
        <template v-else>
            <g
                inkscape:groupmode="layer"
                id="layer2"
                inkscape:label="Сетка">
                <path
                style="fill:none;stroke:#000000;stroke-width:0.05px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
                d="M 7.4899824,4.3313237 9.9903579,5.4596287e-4 H 14.986166 L 17.487563,4.3330932 14.988698,8.6612549 H 9.9917043 Z"
                id="path640"
                sodipodi:insensitive="true" />
                <path
                style="fill:none;stroke:#000000;stroke-width:0.05px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
                d="M -0.0133381,8.6646099 2.4870374,4.3338322 H 7.4828453 L 9.9842419,8.6663794 7.4853773,12.994541 H 2.4883838 Z"
                id="path640-3"
                sodipodi:insensitive="true" />
                <path
                style="fill:none;stroke:#000000;stroke-width:0.05px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
                d="M 7.494359,12.996442 9.9947349,8.6656632 h 4.9958081 l 2.501396,4.3325488 -2.498864,4.328161 H 9.9960809 Z"
                id="path640-3-4"
                sodipodi:insensitive="true" />
                <path
                style="fill:none;stroke:#000000;stroke-width:0.05px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
                d="m 14.990467,8.664205 2.500376,-4.3307784 h 4.995808 l 2.501396,4.3325484 -2.498864,4.328161 h -4.996994 z"
                id="path640-3-4-9"
                sodipodi:insensitive="true" />
            </g>
            <g>
                <!-- TODO: добавить переворот региона, больше регионов в справочник и понятие unFog региона -->
                <tile-item v-for="(item, i) in mapTilesInRegion[region_info.region_type]" :key="i" :type="item.type" :transform="giveTranslateAttr(item.translate)"/>
            </g>
        </template>
    </svg>
</template>

<script>

import tileItem from '@/components/tiles/tileItem.vue'

export default {
  name: 'regionItem',
  components: { tileItem },
  props: {
    number: Number,
    startRegions: Array,
    region_info: Object
  },
  data () {
    return {
      // 7.5 , 4.5
      // справочник расположения регионов относительно стартовой свг-шки
      mapTilesInRegion: {
        1: [
          { type: 'field', translate: [0, 0] },
          { type: 'forest', translate: [0, 0] },
          { type: 'mountains', translate: [0, 0] },
          { type: 'wasteland', translate: [0, 0] }
        ]
      }
    }
  },
  methods: {
    giveTranslateAttr (value) {
      return `translate(${value.toString()})`
    }
  }
}
</script>

<style scoped lang="scss">

</style>
