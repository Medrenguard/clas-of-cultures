<template>
  <div class="main">
    <svg
      class="map"
      width="1300"
      viewBox="-43 0 55 69.5"
      version="1.1"
      id="map"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
      @click="clickSVG">
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
      colors: { красный: 'red', голубой: 'blue', желтый: 'yellow', фиолетовый: 'purple' } // название на английском используется в классах для раскраски
    }
  },
  created () {
    if (this.stage === 'beforeStart') { this.$store.commit('updateStage', 'start') }
    this.$store.commit('updateLayoutByCount', this.layoutByCountGamers[this.currentCountGamers])
    this.fillInfoAboutRegions()
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
        this.$store.commit('updateStage', 'colorChanged')
      } else {
        this.suggestColorChoice()
      }
    },
    changeFirstPlayer () {
      const res = Math.floor(Math.random() * this.currentCountGamers) ? 'player' : 'AI'
      alert('Выбирается первый игрок, бросаются кубики... первым игроком становится ' + res + '.')
      this.$store.commit('updateFirstPlayer', res)
      this.$store.commit('updateStage', 'firstPlayerChanged')
    },
    clickSVG (event) {
      // использование .closest позволит убрать дублирующий слой на всех элементах
      // и убрать .selection-frame, убедившись, что все элементы, которые должны быть кликабельными, имеют fill не none
      const t = event.target.closest('[data-type-object]')
      if (t !== null) {
        console.log(t)
        if (this.stage === 'MOVING_waitingSelection') {
          // простая проверка на то, что клик был по юниту
          if (['infantry', 'settler', 'ship'].includes(t.getAttribute('data-type-object'))) {
            // тут будет функционал выделения юнита
            // console.log('object: ' + t.getAttribute('data-type-object') + ', id: ' + t.getAttribute('data-id-object'))
          }
        }
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
      'opponents',
      'firstPlayer'
    ])
  },
  watch: {
    stage: function (newValue, oldValue) { // StageLoop
      if (newValue === 'start') {
        // если цвета выбраны заранее - значит это тестовый режим, перепрыгиваем этап
        if (this.opponents.player.color === undefined) { this.$store.commit('updateStage', 'changeColor') } else { this.$store.commit('updateStage', 'colorChanged') }
      }
      if (newValue === 'changeColor') {
        this.suggestColorChoice()
      }
      if (newValue === 'colorChanged') {
        // если первый игрок выбран заранее - значит это тестовый режим, перепрыгиваем этап
        if (this.firstPlayer === undefined) { this.$store.commit('updateStage', 'changeFirstPlayer') } else { this.$store.commit('updateStage', 'firstPlayerChanged') }
      }
      if (newValue === 'changeFirstPlayer') {
        this.changeFirstPlayer()
      }
      if (newValue === 'firstPlayerChanged') { this.$store.commit('updateStage', 'readyToGame') }
    }
  }
}
</script>

<style lang="scss">
.redColor {
  .color-main {
    fill: #ff8080;
    stroke: #660000;
    &.borderless-color {
      stroke: #ff8080;
    }
    &.border-color-special {
      fill: #660000;
    }
  }
  .color-lighter {
    fill: #ffd2d2;
    stroke: #959595;
    &.borderless-color {
      stroke: #ffd2d2;
    }
    &.border-color-special {
      fill: #959595;
    }
  }
  .color-darker {
    fill: #aa1515;
    stroke: #959595;
    &.borderless-color {
      stroke: #aa1515;
    }
    &.border-color-special {
      fill: #959595;
    }
  }
}
.blueColor {
  .color-main {
    fill: #80e5ff;
    stroke: #008496;
    &.borderless-color {
      stroke: #80e5ff;
    }
    &.border-color-special {
      fill: #008496;
    }
  }
  .color-lighter {
    fill: #d2f6ff;
    stroke: #959595;
    &.borderless-color {
      stroke: #d2f6ff;
    }
    &.border-color-special {
      stroke: #959595;
    }
  }
  .color-darker {
    fill: #158caa;
    stroke: #959595;
    &.borderless-color {
      stroke: #158caa;
    }
    &.border-color-special {
      stroke: #959595;
    }
  }
}
.yellowColor {
  .color-main {
    fill: #fff280;
    stroke: #969300;
    &.borderless-color {
      stroke: #fff280;
    }
    &.border-color-special {
      fill: #969300;
    }
  }
  .color-lighter {
    fill: #fffcd2;
    stroke: #959595;
    &.borderless-color {
      stroke: #fffcd2;
    }
    &.border-color-special {
      stroke: #959595;
    }
  }
  .color-darker {
    fill: #dfc800;
    stroke: #959595;
    &.borderless-color {
      stroke: #dfc800;
    }
    &.border-color-special {
      stroke: #959595;
    }
  }
}
.purpleColor {
  .color-main {
    fill: #ff80ff;
    stroke: #96008e;
    &.borderless-color {
      stroke: #ff80ff;
    }
    &.border-color-special {
      fill: #96008e;
    }
  }
  .color-lighter {
    fill: #fed2ff;
    stroke: #959595;
    &.borderless-color {
      stroke: #fed2ff;
    }
    &.border-color-special {
      stroke: #959595;
    }
  }
  .color-darker {
    fill: #9115aa;
    stroke: #959595;
    &.borderless-color {
      stroke: #9115aa;
    }
    &.border-color-special {
      stroke: #959595;
    }
  }
}
.selection-frame {
  fill: black !important; // нужно для правильной работы слоя для выбора обьекта: делает заполнение однозначно не none
  fill-opacity: 0 !important; // делает заполнение прозрачным
}
</style>

<style scoped lang="scss">
.map {
  margin: 0 auto;
  display: block;
}
</style>
