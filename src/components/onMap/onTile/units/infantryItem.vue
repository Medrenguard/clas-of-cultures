<template>
  <g
    inkscape:groupmode="layer"
    class="infantry-item"
    inkscape:label="Пехота"
    sodipodi:insensitive="true">
    <path
      class="pentahedron color-darker borderless-color"
      d="m 40.4375,25.75 -2.814367,-0.0014 -0.868397,-2.677041 2.277668,-1.653146 2.276073,1.65534 z"
      transform="matrix(0.1713701,0,0,0.1713701,7.8582465,12.680561)"
      inkscape:label="5гранник" />
    <ellipse
      class="helmet-body pictogram"
      ry="0.29493836"
      rx="0.24067806"
      cy="16.780693"
      cx="14.546916"
      inkscape:label="Шлем" />
    <path
      class="helmet-slot color-darker borderless-color"
      d="m 14.46621,17.061173 v -0.232671 l -0.05694,-0.03287 v -0.05115 l 0.05322,-0.03073 0.08453,0.0488 0.08793,-0.05077 0.0457,0.02639 v 0.05585 l -0.0601,0.0347 v 0.234598 z"
      inkscape:label="Прорези шлема" />
  </g>
</template>

<script>

export default {
  name: 'infantryItem',
  props: {
    unitInfo: Object
  },
  mounted () {
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.helmet-body {
  fill:#ffffff;
  fill-opacity:1;
  stroke:#000000;
  stroke-width:0;
  stroke-dasharray:none;
}
.helmet-slot {
  fill:#000000;
  fill-opacity:1;
  stroke:#000000;
  stroke-width:0.0521119;
  .redColor.disabled & {
    fill: #cc7373;
    stroke: #cc7373;
  }
  .blueColor.disabled & {
    fill: #73bacc;
    stroke: #73bacc;
  }
  .yellowColor.disabled & {
    fill: #ecde66;
    stroke: #ecde66;
  }
  .purpleColor.disabled & {
    fill: #bd73cc;
    stroke: #bd73cc;
  }
}
</style>
