<template>
  <v-container class="modal__container">
    <v-row align="center" justify="center" class="modal__connect__row">
      <v-col cols="6" class="blue-grey darken-4 pa-10 modal__connect" >
        <v-text-field color="lime lighten-1" label="Ton pseudo" outlined> </v-text-field>
        <v-text-field
          :type="showMdp ? 'text' : 'password'"
          label="Ton mot de passe"
          outlined
          :append-icon="showMdp ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showMdp = !showMdp"
        >
        </v-text-field>
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn class="blue-grey lighten-1" large float-right>
              Go parier ta maman
              !
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showMdp: false
    };
  }
};
</script>

<style lang="scss">
.modal__container {
  min-height: 100%;
  .modal__connect__row {
    height: 100%;
    .modal__connect{
      border-radius: 4px;
    }
  }
}
</style>
