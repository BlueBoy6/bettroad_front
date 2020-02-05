<template>
  <v-app class="page__view">
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  components: {
  },
};
</script>
<style lang="scss">
.page__view{
  min-width: 100vw;
  min-height: 100vh;
}
</style>