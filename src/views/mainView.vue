<template>
  <div class="home">
    <regionUnderFog />
  </div>
</template>

<script>
import regionUnderFog from '@/components/regions/regionUnderFog.vue'
// margin: 0px 0px -32.8px -37.8px
export default {
  name: 'mainView',
  components: {
    regionUnderFog
  }
}
</script>
