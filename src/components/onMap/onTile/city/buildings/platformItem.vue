<template>
  <g
    inkscape:groupmode="layer"
    id="layer1"
    inkscape:label="Платформа"
    style="display:inline">
    <path
      class="platform"
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
    <path
      class="platform"
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
    <path
      class="platform"
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
    <path
      class="platform"
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
  </g>
</template>

<script>

export default {
  name: 'platformItem',
  components: {
  },
  props: {},
  mounted () {
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.platform {
    fill:#000000;
    stroke:#959595;
    stroke-width:0.105746;
    stroke-dasharray:none;
    stroke-opacity:1;
    paint-order:stroke markers fill;
}
</style>
