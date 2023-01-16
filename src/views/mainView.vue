<template>
  <div class="map">
    <region-item v-for="i in layoutByCount.regionsCount" :region_info="regionItemsOnMap[i-1]" :key="i" :numberRegion="i" :style="{ margin: shiftRegion(i) }"/>
  </div>
</template>

<script>
import regionItem from '@/components/onMap/regionItem.vue'
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
        }
      },
      colors: { красный: '#ff0000', голубой: '#00c4ff', желтый: '#fff200', фиолетовый: '#8500ff' }
    }
  },
  created () {
    if (this.stage === 'beforeStart') { this.$store.commit('updateStage', 'start') }
    this.$store.commit('updateLayoutByCount', this.layoutByCountGamers[this.currentCountGamers])
    this.fillInfoAboutRegions()
    if (this.stage === 'start' && this.opponents.player.color === undefined) {
      this.$store.commit('updateStage', 'changeColor')
      this.suggestColorChoice()
    }
  },
  mounted () {
  },
  methods: {
    fillInfoAboutRegions () {
      for (let i = 1; i <= this.layoutByCount.regionsCount; i++) {
        const filler = { region_type: null, orientation: undefined }
        // Заполнение стартовых тайлов на 2 игроков
        if (i === this.layoutByCount.regionsForStart[0]) { filler.region_type = 1; filler.orientation = 'avers' }
        if (i === this.layoutByCount.regionsForStart[1]) { filler.region_type = 1; filler.orientation = 'revers' }

        this.$store.commit('updateRegionInfo', { regionNum: i - 1, info: filler })
      }
    },
    suggestColorChoice () {
      // демо-выбор цвета
      const color = prompt(`Выберите цвет своих фигурок и впишите его в ответ: ${Object.keys(this.colors).join(', ')}`, Object.keys(this.colors)[0])
      if (this.colors[color] !== undefined) {
        const lostColors = { ...this.colors }
        delete lostColors[color]
        this.$store.commit('updateOpponentsColor', { player: this.colors[color], AI: Object.values(lostColors)[0] })
        this.$store.commit('updateStage', 'readyToGame')
      } else {
        this.suggestColorChoice()
      }
    },
    shiftRegion (regionNum) {
      // размер тайла на данный момент - 32.7 пикселя
      const tileHeight = 32.7
      const baseShiftByX = 32.7 * 1.725770642201835 // сдвиг по оси X для большинства тайлов
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
    }
  },
  computed: {
    ...mapState([
      'currentCountGamers',
      'regionItemsOnMap',
      'layoutByCount',
      'stage',
      'opponents'
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
