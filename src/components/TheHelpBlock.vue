<template>
  <div class="help__wrap">
    <div class="help__content">
      {{ text }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheHelpBlock',
  props: {
  },
  data () {
    return {
      text: 'Тут будет подсказка по действиям'
    }
  },
  methods: {
  },
  computed: {
    ...mapState([
      'stage'
    ])
  },
  watch: {
    stage: function (nV, oV) { // StageLoop
      if (nV === 'MOVING_waitingSelection') {
        this.text = 'Выберите юнит(ы) для передвижения'
      } else if (nV === 'MOVING_selectingTile') {
        this.text = 'Нажмите на тайл для перемещения формирования'
      } else if (nV === 'MOVING_selectingRegion') {
        this.text = 'Нажмите на регион для разведки флотом'
      } else if ([nV, oV].includes('MOVING_shipsCantMoveAndTheyExploringManual')) {
        this.text = 'В этом регионе нет моря для размещения флота или оно недостижимо, флот останется на месте старта. Выберите ориентацию региона'
      } else if (nV === 'MOVING_exploringManual') {
        this.text = 'Этот регион можно расположить 2 способами. Выберите ориентацию региона'
      } else if (nV === 'MOVING_shipsMoveAfterExploring') {
        this.text = 'Разведка региона завершена. Поместите флот на один из тайлов моря в новом регионе'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.help__wrap {
  position: fixed;
  top: 33%;
  right: 20px;
  max-width: 30%;
  display: flex;
  justify-content: center;
}
.help__content {
  background: rgb(0 0 0 / 53%);
  color: white;
  font-size: 1.5vw;
  border-radius: 7px;
  padding: 10px 20px;
  cursor: default;
  user-select: none;
}
</style>
