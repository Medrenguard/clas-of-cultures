<template>
  <g
    inkscape:groupmode="layer"
    class="settler-item"
    inkscape:label="Поселенец"
    sodipodi:insensitive="true">
    <path
      class="pentahedron color-darker borderless-color"
      :class="{ 'selected-pentahedron' : unitInfo.selected }"
      d="m 40.4375,25.75 -2.814367,-0.0014 -0.868397,-2.677041 2.277668,-1.653146 2.276073,1.65534 z"
      transform="matrix(0.1713701,0,0,0.1713701,7.8582465,12.680561)"
      inkscape:label="5гранник" />
    <path
      d="m 14.472248,17.016708 h 0.134969 v -0.08971 h 0.180009 l 0.0021,-0.35048 h -0.08073 l 3.3e-5,0.254116 -0.119103,-0.001 -3.4e-5,-0.253082 h -0.100329 l -3.3e-5,0.252005 -0.11173,-3.3e-5 -10e-4,-0.253579 h -0.07139 v 0.352054 l 0.168289,0.0011 z"
      class="hayfork"
      :class="{ 'selected-pictogram' : unitInfo.selected }"
      inkscape:label="Вилы"
      sodipodi:nodetypes="ccccccccccccccccc" />
  </g>
</template>

<script>

export default {
  name: 'settlerItem',
  props: {
    unitInfo: Object
  },
  mounted () {
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.hayfork {
  fill:#f9f9f9;
  fill-opacity:1;
  stroke:#000000;
  stroke-width:0;
  stroke-linecap:butt;
  stroke-linejoin:miter;
  stroke-dasharray:none;
  stroke-opacity:1;
}
</style>
