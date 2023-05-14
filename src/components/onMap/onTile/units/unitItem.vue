<template>
  <g
    inkscape:groupmode="layer"
    class="unit-item"
    :class="colorClass"
    inkscape:label="Юнит">
      <settler-item v-if="unitType === 'settler'" :settlerID="unitID" :settlerOwner="unitOwner"/>
      <infantry-item v-else-if="unitType === 'infantry'" :infantryID="unitID" :infantryOwner="unitOwner"/>
      <ship-item v-else-if="unitType === 'ship'" :shipID="unitID" :shipOwner="unitOwner"/>
  </g>
</template>

<script>
import settlerItem from '@/components/onMap/onTile/units/settlerItem.vue'
import infantryItem from '@/components/onMap/onTile/units/infantryItem.vue'
import shipItem from '@/components/onMap/onTile/units/shipItem.vue'

export default {
  name: 'unitItem',
  components: {
    settlerItem,
    infantryItem,
    shipItem
  },
  props: {
    unitID: Number,
    unitType: String,
    unitOwner: String,
    colorClass: String
  },
  mounted () {
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">

</style>
