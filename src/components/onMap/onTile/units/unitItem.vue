<template>
  <g
    inkscape:groupmode="layer"
    class="unit-item"
    :class="[colorClass, selected ? 'selected' : '', canMove ? '' : 'disabled']"
    inkscape:label="Юнит"
    data-type-object="unit"
    @mouseover="mouseoverUnit"
    @mouseout="mouseoutUnit">
      <settler-item v-if="unitInfo.type === 'settler'" :unitInfo="unitInfo"/>
      <infantry-item v-else-if="unitInfo.type === 'infantry'" :unitInfo="unitInfo"/>
      <ship-item v-else-if="unitInfo.type === 'ship'" :unitInfo="unitInfo"/>
      <path
        class="selection-frame"
        :data-type-object="unitInfo.type"
        :data-id-object="unitID"
        :data-owner-object="unitInfo.owner"
        d="m 40.4375,25.75 -2.814367,-0.0014 -0.868397,-2.677041 2.277668,-1.653146 2.276073,1.65534 z"
        transform="matrix(0.1713701,0,0,0.1713701,7.8582465,12.680561)" />
  </g>
</template>

<script>
import settlerItem from '@/components/onMap/onTile/units/settlerItem.vue'
import infantryItem from '@/components/onMap/onTile/units/infantryItem.vue'
import shipItem from '@/components/onMap/onTile/units/shipItem.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'unitItem',
  components: {
    settlerItem,
    infantryItem,
    shipItem
  },
  props: {
    unitID: Number,
    colorClass: String,
    selected: Boolean,
    canMove: Boolean
  },
  mounted () {
  },
  computed: {
    ...mapState([
      'stage'
    ]),
    ...mapGetters([
      'GET_UNIT_BY_ID'
    ]),
    unitInfo () {
      return this.GET_UNIT_BY_ID(this.unitID)
    }
  },
  methods: {
    mouseoverUnit (event) {
      if (this.stage === 'MOVING_waitingSelection') {
      // проверка на то, что юнит еще может ходить, а так же, что юнит твой
        if (this.unitInfo.owner === 'player' && this.unitInfo.canMove_onThisAction) {
          const t = event.target.closest('[data-type-object]')
          t.classList.add('hover')
        }
      }
    },
    mouseoutUnit (event) {
      if (this.stage === 'MOVING_waitingSelection') {
        // проверка на то, что юнит еще может ходить, а так же, что юнит твой
        if (this.unitInfo.owner === 'player' && this.unitInfo.canMove_onThisAction) {
          const t = event.target.closest('[data-type-object]')
          t.classList.remove('hover')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
<style lang="scss">
.pentahedron {
  fill:#000000;
  fill-opacity:1;
  stroke:#000000;
  stroke-width:0.0499999;
  stroke-dasharray:none;
}
</style>
