<template>
  <div class="main">
    <svg
      viewBox="-47.5 0 120 70"
      version="1.1"
      id="map"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg">
        <region-item v-for="i in layoutByCount.regionsCount" :region_info="regionItemsOnMap[i-1]" :key="i" :numberRegion="i" :transform="giveTranslateAttr(i)"/>
    </svg>
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
      colors: { красный: 'red', голубой: 'blue', желтый: 'yellow', фиолетовый: 'purple' }
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
    giveTranslateAttr (numberRegion) {
      const res = this.calcTranslateAttr(numberRegion)
      return `translate(${res.toString()})`
    },
    calcTranslateAttr (numberRegion) {
      const res = []
      const shift = { x: 15, y: 8.66 }
      // описываем заполнение полей x
      if ((numberRegion - 1) % 3 === 0) { res[0] = 0 }
      if ((numberRegion - 2) % 3 === 0) { res[0] = 0 - shift.x }
      if ((numberRegion - 3) % 3 === 0) { res[0] = shift.x }
      // описываем заполнение полей y
      res[1] = Math.floor((1 + numberRegion) / 3) * shift.y
      if ((numberRegion - 1) % 3 !== 0) { res[1] += Math.floor((numberRegion - 2) / 3) * shift.y }
      if ((numberRegion - 1) % 3 === 0) { res[1] += Math.floor(numberRegion / 3) * shift.y }
      return res
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

<style lang="scss">
.redSVG.redSVG {
  fill: #ff0000;
  stroke:#ff0000;
}
.blueSVG.blueSVG {
  fill: #00c4ff;
  stroke: #00c4ff;
}
.yellowSVG.yellowSVG {
  fill: #fff200;
  stroke: #fff200;
}
.purpleSVG.purpleSVG {
  fill: #8500ff;
  stroke: #8500ff;
}
</style>

<style scoped lang="scss">

</style>
