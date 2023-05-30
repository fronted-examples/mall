<template>
  <section class="boiling">
    沸点
    <TinymceEditor />
  </section>
</template>

<script>
import TinymceEditor from '@/components/TinymceEditor'
export default {
  name: 'Boiling',
  components: {
    TinymceEditor
  },
  data () {
    return {}
  },
  // asyncData ({ route, store }) {
  //   return store.dispatch('user/getRandomCode')
  // },
}
</script>

<style lang="scss" scoped>
</style>