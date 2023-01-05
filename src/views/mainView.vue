<template>
  <div class="map">
    <region-item v-for="i in layoutByCountGamers[currentCountGamers].regionsCount" :startRegions="layoutByCountGamers[currentCountGamers].regionsForStart" :region_info="regionItemsOnMap[i-1]" :key="i" :number="i" :style="{ margin: shiftRegion(i), rotate: rotateRegion(i) }"/>
  </div>
</template>

<script>
import regionItem from '@/components/regions/regionItem.vue'
import { mapState } from 'vuex'

export default {
  name: 'mainView',
  components: {
    regionItem
  },
  data () {
    return {
      layoutByCountGamers: {
        2: {
          regionsCount: 10,
          regionsForStart: [1, 10]
        },
        3: {
          regionsCount: 15,
          regionsForStart: [1, 9, 13]
        },
        4: {
          regionsCount: 18,
          regionsForStart: [2, 3, 17, 18]
        }
      }
    }
  },
  created () {
    this.fillInfoAboutRegions()
    this.$store.commit('updateLayoutByCount', this.layoutByCountGamers[this.currentCountGamers])
  },
  mounted () {
  },
  methods: {
    fillInfoAboutRegions () {
      for (let i = 0; i < this.layoutByCountGamers[this.currentCountGamers].regionsCount; i++) {
        const filler = { region_type: null, orientation: undefined }
        if (this.currentCountGamers === 2) {
          if (i === 0) { filler.region_type = 1; filler.orientation = 'avers' }
          if (i === 9) { filler.region_type = 1; filler.orientation = 'revers' }

          this.$store.commit('updateRegionInfo', { regionNum: i, info: filler })
        }
      }
    },
    shiftRegion (regionNum) {
      // размер тайла на данный момент - 32.7 пикселя
      const gamers = this.currentCountGamers
      const tileHeight = 32.7
      const baseShiftByX = 32.7 * 1.725770642201835 // сдвиг по оси X для большинства тайлов
      if (gamers === 2) {
        switch (regionNum) {
          case 2:
            return `${tileHeight}px 0px 0px -${baseShiftByX}px`
          case 3:
            return `${tileHeight}px 0px 0px ${baseShiftByX}px`
          case 4:
            return `${tileHeight * 2}px 0px 0px 0px`
          case 5:
            return `${tileHeight * 3}px 0px 0px -${baseShiftByX}px`
          case 6:
            return `${tileHeight * 3}px 0px 0px ${baseShiftByX}px`
          case 7:
            return `${tileHeight * 4}px 0px 0px 0px`
          case 8:
            return `${tileHeight * 5}px 0px 0px -${baseShiftByX}px`
          case 9:
            return `${tileHeight * 5}px 0px 0px ${baseShiftByX}px`
          case 10:
            return `${tileHeight * 6}px 0px 0px 0px`
        }
      } else if (gamers === 3) {
        // TODO: переписать с поворотом тайла внутри svg(а не снаружи) или отказаться от идеи игры на 3+ человек в угоду обучающей демо-версии игры
        switch (regionNum) {
          case 2:
            return `-${tileHeight}px 0px 0px -${baseShiftByX}px`
          case 3:
            return '41px 0px 0px -42.3px'
          case 4:
            return '57.2px 0px 0px 14.2px'
          case 5:
            return '41px 0px 0px 70.6px'
          case 6:
            return '57.2px 0px 0px -99px'
          case 7:
            return `${tileHeight * 3}px 0px 0px -${baseShiftByX}px`
          case 8:
            return `${tileHeight * 3}px 0px 0px ${baseShiftByX}px`
          case 9:
            return '139.1px 0px 0px -99px'
          case 10:
            return '139.1px 0px 0px 14.2px'
          case 11:
            return '122.7px 0px 0px 127.2px'
          case 12:
            return '155.3px 0px 0px -42.5px'
          case 13:
            return '155.3px 0px 0px 70.6px'
          case 14:
            return '204.6px 0px 0px -99px'
          case 15:
            return `${tileHeight * 6}px 0px 0px 0px`
        }
      } else if (gamers === 4) {
        const startShiftByX = 32.7 * 2.596330275229358 // сдвиг по оси X для раскадки на четверых для стартовых тайлов
        switch (regionNum) {
          case 2:
            return `-${tileHeight * 0.5}px 0px 0px -${startShiftByX}px`
          case 3:
            return `-${tileHeight * 0.5}px 0px 0px ${startShiftByX}px`
          case 4:
            return `${tileHeight}px 0px 0px -${baseShiftByX}px`
          case 5:
            return `${tileHeight}px 0px 0px ${baseShiftByX}px`
          case 6:
            return `${tileHeight * 2}px 0px 0px -${baseShiftByX * 2}px`
          case 7:
            return `${tileHeight * 2}px 0px 0px 0px`
          case 8:
            return `${tileHeight * 2}px 0px 0px ${baseShiftByX * 2}px`
          case 9:
            return `${tileHeight * 3}px 0px 0px -${baseShiftByX}px`
          case 10:
            return `${tileHeight * 3}px 0px 0px ${baseShiftByX}px`
          case 11:
            return `${tileHeight * 4}px 0px 0px -${baseShiftByX * 2}px`
          case 12:
            return `${tileHeight * 4}px 0px 0px 0px`
          case 13:
            return `${tileHeight * 4}px 0px 0px ${baseShiftByX * 2}px`
          case 14:
            return `${tileHeight * 5}px 0px 0px -${baseShiftByX}px`
          case 15:
            return `${tileHeight * 5}px 0px 0px ${baseShiftByX}px`
          case 16:
            return `${tileHeight * 6}px 0px 0px 0px`
          case 17:
            return `${tileHeight * 6.5}px 0px 0px -${startShiftByX}px`
          case 18:
            return `${tileHeight * 6.5}px 0px 0px ${startShiftByX}px`
        }
      }
    },
    rotateRegion (regionNum) {
      if (this.currentCountGamers !== 3) {
        return '0'
      } else {
        if ([3, 5, 9, 10, 14].includes(regionNum)) { return '60deg' } else if ([4, 6, 11, 12, 13].includes(regionNum)) { return '-60deg' } else { return '0' }
      }
    }
  },
  computed: {
    ...mapState([
      'currentCountGamers',
      'layout',
      'regionItemsOnMap'
    ])
  }
}
</script>

<style scoped lang="scss">
.map {
  text-align: center;
}
.map svg {
  position: absolute;
}
</style>
