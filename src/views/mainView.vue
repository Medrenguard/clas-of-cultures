<template>
  <div class="map">
    <regionUnderFog v-for="i in layoutByCountGamers[currentCountGamers].regionsCount" :key="i" :style="{ margin: exposeRegion(i) }"/>
  </div>
</template>

<script>
import regionUnderFog from '@/components/regions/regionUnderFog.vue'

export default {
  name: 'mainView',
  components: {
    regionUnderFog
  },
  data () {
    return {
      layoutByCountGamers: {
        2: {
          regionsCount: 10
        },
        3: {
          regionsCount: 15
        },
        4: {
          regionsCount: 18
        }
      },
      currentCountGamers: null
    }
  },
  created () {
    this.currentCountGamers = 4
  },
  mounted () {
  },
  methods: {
    exposeRegion (regionNum) {
      // размер тайла на данный момент - 32.7 пикселя
      const gamers = this.currentCountGamers
      const tileHeight = 32.7
      if (gamers === 2) {
        const sideByX = 32.7 * 1.725770642201835 // сдвиг по оси X для раскадки на двоих
        switch (regionNum) {
          case 2:
            return `${tileHeight}px 0px 0px -${sideByX}px`
          case 3:
            return `${tileHeight}px 0px 0px ${sideByX}px`
          case 4:
            return `${tileHeight * 2}px 0px 0px 0px`
          case 5:
            return `${tileHeight * 3}px 0px 0px -${sideByX}px`
          case 6:
            return `${tileHeight * 3}px 0px 0px ${sideByX}px`
          case 7:
            return `${tileHeight * 4}px 0px 0px 0px`
          case 8:
            return `${tileHeight * 5}px 0px 0px -${sideByX}px`
          case 9:
            return `${tileHeight * 5}px 0px 0px ${sideByX}px`
          case 10:
            return `${tileHeight * 6}px 0px 0px 0px`
        }
      } else if (gamers === 4) {
        const baseSideByX = 32.7 * 1.725770642201835 // сдвиг по оси X для раскадки на четверых для большинства тайлов
        const startSideByX = 32.7 * 2.596330275229358 // сдвиг по оси X для раскадки на четверых для стартовых тайлов
        switch (regionNum) {
          case 2:
            return `-${tileHeight * 0.5}px 0px 0px -${startSideByX}px`
          case 3:
            return `-${tileHeight * 0.5}px 0px 0px ${startSideByX}px`
          case 4:
            return `${tileHeight}px 0px 0px -${baseSideByX}px`
          case 5:
            return `${tileHeight}px 0px 0px ${baseSideByX}px`
          case 6:
            return `${tileHeight * 2}px 0px 0px -${baseSideByX * 2}px`
          case 7:
            return `${tileHeight * 2}px 0px 0px 0px`
          case 8:
            return `${tileHeight * 2}px 0px 0px ${baseSideByX * 2}px`
          case 9:
            return `${tileHeight * 3}px 0px 0px -${baseSideByX}px`
          case 10:
            return `${tileHeight * 3}px 0px 0px ${baseSideByX}px`
          case 11:
            return `${tileHeight * 4}px 0px 0px -${baseSideByX * 2}px`
          case 12:
            return `${tileHeight * 4}px 0px 0px 0px`
          case 13:
            return `${tileHeight * 4}px 0px 0px ${baseSideByX * 2}px`
          case 14:
            return `${tileHeight * 5}px 0px 0px -${baseSideByX}px`
          case 15:
            return `${tileHeight * 5}px 0px 0px ${baseSideByX}px`
          case 16:
            return `${tileHeight * 6}px 0px 0px 0px`
          case 17:
            return `${tileHeight * 6.5}px 0px 0px -${startSideByX}px`
          case 18:
            return `${tileHeight * 6.5}px 0px 0px ${startSideByX}px`
        }
      }
    }
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
