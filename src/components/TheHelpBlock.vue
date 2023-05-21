<template>
  <div class="help__wrap">
    <div class="help__content">
      {{ text }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'TheHelpBlock',
  props: {
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.help__wrap {
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: center;
}
</style>
