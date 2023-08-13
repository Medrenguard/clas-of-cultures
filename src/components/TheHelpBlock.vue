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
      text: 'Тут будет подсказка по действиям'
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
