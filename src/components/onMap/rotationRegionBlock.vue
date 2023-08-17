<template>
  <g
    inkscape:label="Блок переворота"
    transform="translate(0.66145835)"
    class="rotation-region-block-wrap">
    <g
    inkscape:label="Кнопка переворота"
    class="btn-rotate__wrap"
    transform="translate(-0.66145835)"
    @click="rotateRegion">
      <path
      class="btn-rotate__btn"
      d="m 10.352979,8.0502277 h 0.711364 l 0.355624,-0.6159572 h 0.710052 l 0.355453,0.6156626 h 0.7113 l 0.355543,0.6158195 -0.355324,0.6154388 h -0.710752 l -0.355575,0.6158741 h -0.71064 L 11.064908,9.2819869 H 10.354641 L 9.9994725,8.6668146 Z"
      inkscape:label="Границы кнопки переворота"
      transform="translate(0.66145835)" />
      <g
      transform="matrix(0.00146283,-3.9196333e-4,3.9196333e-4,0.00146283,11.506025,8.1300108)"
      inkscape:label="Стрелочки"
      >
        <path
        d="M 678.1,754.1 C 624.1,792 561,810.9 496.3,810 c -8.6,-0.1 -17,-0.5 -25.4,-1.3 -3.4,-0.3 -6.8,-0.9 -10.3,-1.3 -6.6,-0.9 -13.2,-1.7 -19.6,-3 -4,-0.8 -7.9,-1.8 -11.7,-2.7 -6.3,-1.4 -12.6,-2.9 -18.7,-4.8 -3,-0.9 -5.9,-2 -8.8,-3 -7.1,-2.3 -14.1,-4.8 -21,-7.7 -1.5,-0.6 -3.1,-1.4 -4.6,-2 -8,-3.5 -15.9,-7.2 -23.7,-11.4 -0.3,-0.2 -0.7,-0.4 -1,-0.5 -26,-14.3 -49.8,-32.1 -70.6,-52.9 -0.3,-0.3 -0.6,-0.7 -1,-1.1 -6.5,-6.5 -12.6,-13.3 -18.5,-20.4 -1.2,-1.5 -2.4,-3.2 -3.7,-4.7 -42.4,-53.1 -68,-120.3 -68,-193.3 h 81.7 L 140.7,303.9 10,499.9 h 81.7 c 0,85.9 26.8,165.6 72.3,231.4 0.5,0.9 0.9,1.9 1.5,2.8 4.7,6.7 10,12.9 15,19.3 1.9,2.4 3.7,4.9 5.6,7.2 7.4,9.1 15.4,17.5 23.5,25.9 0.8,0.8 1.5,1.6 2.3,2.4 27.3,27.3 58.2,50.4 91.8,68.8 0.9,0.5 1.8,1.1 2.7,1.5 9.6,5.2 19.6,9.9 29.7,14.4 2.5,1.1 5,2.3 7.5,3.3 8.6,3.6 17.5,6.7 26.4,9.7 4.2,1.4 8.4,2.9 12.7,4.2 7.8,2.3 15.8,4.2 23.8,6.1 5.4,1.3 10.6,2.6 16,3.6 2.3,0.5 4.4,1.2 6.6,1.5 7.6,1.3 15.2,2.1 22.8,3 2.7,0.3 5.4,0.8 8.2,1.1 13.6,1.3 27.2,2.2 40.7,2.2 83,0 164,-25.4 233.5,-74 22.2,-15.6 27.6,-46.1 12,-68.2 -15.6,-22.2 -46.1,-27.5 -68.2,-12"
        class="btn-rotate__arrow"
        inkscape:label="Нижняя стрелочка" />
        <path
        d="m 908.4,499.9 c 0,-85.7 -26.7,-165.2 -72,-230.9 -0.6,-1.1 -1.1,-2.3 -1.8,-3.3 -5.7,-8 -11.8,-15.5 -17.9,-23 -0.7,-0.9 -1.4,-1.9 -2.1,-2.8 -41.4,-50.3 -93.5,-89.1 -152.4,-114.5 -1.6,-0.7 -3.2,-1.5 -4.9,-2.2 -9.5,-3.9 -19.1,-7.3 -28.8,-10.5 -3.5,-1.2 -6.9,-2.4 -10.5,-3.4 -8.4,-2.5 -17,-4.6 -25.7,-6.6 -4.8,-1.1 -9.5,-2.3 -14.4,-3.3 -2.4,-0.4 -4.6,-1.2 -7,-1.6 -6.5,-1.1 -12.9,-1.6 -19.4,-2.5 -4.5,-0.5 -8.8,-1.2 -13.3,-1.7 -10.8,-1 -21.6,-1.4 -32.4,-1.6 -2,0 -3.8,-0.3 -5.8,-0.3 -0.3,0 -0.7,0.1 -1,0.1 -82.9,0 -163.7,25.1 -233.1,73.7 -22.2,15.5 -27.6,46 -12,68.2 15.5,22.2 46.1,27.6 68.2,12 53.6,-37.5 116.2,-56.5 180.3,-55.9 9.2,0 18.3,0.5 27.3,1.4 2.8,0.3 5.5,0.7 8.3,1 7.4,0.9 14.7,2 21.9,3.4 3.2,0.6 6.3,1.4 9.5,2.2 7.1,1.6 14.1,3.3 21,5.4 2.2,0.7 4.3,1.5 6.6,2.2 7.9,2.5 15.7,5.4 23.3,8.5 0.8,0.3 1.6,0.7 2.3,1 45.7,19.6 85.8,49.9 117,87.7 0.2,0.2 0.4,0.5 0.5,0.7 44,53.6 70.5,122 70.5,196.6 H 728.9 L 859.6,695.9 990,500 Z"
        class="btn-rotate__arrow"
        inkscape:label="Верняя стрелочка" />
      </g>
    </g>
    <g
    inkscape:label="Кнопка подтверждения"
    class="btn-apply__wrap"
    @click="applyRotate"
    transform="translate(-0.66145835,0.05846521)">
      <rect
      class="btn-apply__btn"
      width="2.8589487"
      height="0.88282466"
      x="10.35"
      y="10.18"
      inkscape:label="Кнопка"
      transform="translate(0.66145835)" />
      <text
      class="btn-apply__text"
      x="11.2"
      y="10.89"
      inkscape:label="Текст"
      transform="translate(0.66145835)">ОК
      </text>
    </g>
  </g>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'rotationRegionBlock',
  props: {
    numberRegion: Number,
    region_type: Number,
    orientation: String
  },
  data () {
    return {}
  },
  methods: {
    rotateRegion () {
      const rotatedOrientation = this.orientation === 'avers' ? 'revers' : 'avers'
      const filler = { region_type: this.region_type, orientation: rotatedOrientation }
      this.$store.commit('updateRegionInfo', { regionNum: this.numberRegion, info: filler })
    },
    applyRotate () {
      this.$store.commit('updateRegionForManualOrientation', null)
      if (this.stage === 'MOVING_shipsExploringManualThenChange') {
        this.$store.commit('updateStage', 'MOVING_shipsMoveAfterExploring')
      } else if (this.stage === 'MOVING_shipsExploringManualThenMoveStrict') {
        // принудительное перемещение на единственный доступный для перемещения тайл
        this.$store.dispatch('formationMovement', { region: this.numberRegion, tile: this.shipExploringData.data[this.orientation][0].tile })
        this.$store.commit('updateShipExploringData', {})
        this.$store.commit('updateStage', 'MOVING_waitingSelection')
      } else {
      // заглушка для ускоренного завершения режима выбора ориентации. TODO: переключать на предыдущий этап или следующий, если этот закончен(через стор и mainView)
        this.$store.commit('updateStage', 'MOVING_waitingSelection')
      }
    }
  },
  computed: {
    ...mapState([
      'regionItemsOnMap',
      'stage',
      'shipExploringData'
    ])
  }
}
</script>

<style scoped lang="scss">
.btn-rotate {
  &__wrap {
    cursor: pointer;
  }
  &__wrap:hover &__btn {
    fill:#ffda02;
  }
  &__wrap:hover &__arrow {
    fill:#000000;
  }
  &__btn {
    fill:#000000;
    stroke:#000000;
    stroke-width:0.04;
  }
  &__arrow {
    fill:#ffffff;
    fill-opacity:1
  }
}
.btn-apply {
  &__wrap {
    cursor: pointer;
  }
  &__wrap:hover &__btn {
    fill:#4bff00;
  }
  &__btn {
    fill:#3bc500;
    fill-opacity:1;
    fill-rule:nonzero;
    stroke:#676767;
    stroke-width:0.0499999;
    stroke-linecap:round;
    stroke-linejoin:bevel;
    stroke-opacity:1
  }
  &__text {
    font-size:0.8px;
    fill:#000000;
    fill-opacity:1;
    fill-rule:nonzero;
    stroke:#000000;
    stroke-width:0.01;
    stroke-linecap:round;
    stroke-linejoin:bevel;
    stroke-opacity:1;
    user-select: none;
  }
}
</style>
