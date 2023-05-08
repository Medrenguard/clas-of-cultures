<template>
  <g
    inkscape:groupmode="layer"
    class="platform-wrap"
    :class="colorClass"
    inkscape:label="Платформа"
    style="display:inline">
    <path v-if="buildingNumber === 4"
      class="platform-item color-darker"
      sodipodi:type="arc"
      sodipodi:cx="-11.292514"
      sodipodi:cy="11.109304"
      sodipodi:rx="1.894254"
      sodipodi:ry="1.894254"
      sodipodi:start="4.712389"
      sodipodi:end="6.2831853"
      sodipodi:arc-type="slice"
      d="m -11.292514,9.2150505 a 1.894254,1.894254 0 0 1 1.8942541,1.8942535 h -1.8942541 z"
      transform="rotate(-90,-0.028645,-0.08026059)"
      inkscape:label="Левая верхняя плашка" />
    <path v-else-if="buildingNumber === 3"
      class="platform-item color-darker"
      sodipodi:type="arc"
      sodipodi:cx="-11.109127"
      sodipodi:cy="-11.371874"
      sodipodi:rx="1.894254"
      sodipodi:ry="1.894254"
      sodipodi:start="4.712389"
      sodipodi:end="6.2831853"
      sodipodi:arc-type="slice"
      d="m -11.109127,-13.266128 a 1.894254,1.894254 0 0 1 1.8942539,1.894254 h -1.8942539 z"
      transform="rotate(180,0.02580779,-0.05445279)"
      inkscape:label="Левая нижняя плашка" />
    <path v-else-if="buildingNumber === 2"
      class="platform-item color-darker"
      sodipodi:type="arc"
      sodipodi:cx="11.371855"
      sodipodi:cy="-11.214873"
      sodipodi:rx="1.894254"
      sodipodi:ry="1.894254"
      sodipodi:start="4.712389"
      sodipodi:end="6.2831853"
      sodipodi:arc-type="slice"
      d="m 11.371855,-13.109127 a 1.894254,1.894254 0 0 1 1.894254,1.894254 h -1.894254 z"
      transform="rotate(90,0.0802606,-0.028645)"
      inkscape:label="Правая нижняя плашка" />
    <path v-else-if="buildingNumber === 1"
      class="platform-item color-darker"
      sodipodi:type="arc"
      sodipodi:cx="11.089598"
      sodipodi:cy="11.39171"
      sodipodi:rx="1.6963626"
      sodipodi:ry="1.6963626"
      sodipodi:start="4.712389"
      sodipodi:end="6.2831853"
      sodipodi:arc-type="slice"
      d="M 11.089598,9.6953477 A 1.6963626,1.6963626 0 0 1 12.78596,11.39171 h -1.696362 z"
      inkscape:label="Правая верхняя плашка"
      transform="matrix(1.1166563,0,0,1.1166563,-1.1167798,-1.5374033)" />
      <temple-item v-if="buildingType === 'temple'" :buildingNumber="buildingNumber" />
      <academy-item v-else-if="buildingType === 'academy'" :buildingNumber="buildingNumber" />
      <castle-item v-else-if="buildingType === 'castle'" :buildingNumber="buildingNumber" />
      <port-item v-else-if="buildingType === 'port'" :buildingNumber="buildingNumber" />
  </g>
</template>

<script>
import templeItem from '@/components/onMap/onTile/city/buildings/templeItem.vue'
import academyItem from '@/components/onMap/onTile/city/buildings/academyItem.vue'
import castleItem from '@/components/onMap/onTile/city/buildings/castleItem.vue'
import portItem from '@/components/onMap/onTile/city/buildings/portItem.vue'

export default {
  name: 'platformItem',
  components: {
    portItem,
    castleItem,
    templeItem,
    academyItem
  },
  props: {
    buildingNumber: Number,
    buildingType: String,
    colorClass: String
  },
  mounted () {
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.platform-item {
    fill:#000000;
    stroke:#959595;
    stroke-width:0.105746;
    stroke-dasharray:none;
    stroke-opacity:1;
    paint-order:stroke markers fill;
}
</style>
