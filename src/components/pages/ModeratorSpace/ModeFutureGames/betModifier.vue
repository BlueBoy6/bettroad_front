<template>
  <div>
    <v-btn-toggle
        class="mb-2"
        mandatory
      >
        <v-btn :key="option.uid" v-for="option in categories" @click="chooseCategorie(option)" small>
          {{ option.name }} 
        </v-btn>
      </v-btn-toggle>
      <v-text-field
        label="Ajouter un titre de paris" 
        v-model="betLabel"
        :append-icon="createNewPicto? 'mdi-plus' : ''"
        @click:append="createNewBet"
        @blur="blurSaveInput"
        light
        outlined 
        dense
        />
  </div>
</template>

<script>
/* eslint-disable no-console */
  export default {
    props: {
      bet: {
        type: Object,
        required: false,
      },
      categories: {
        type: Array,
        required: false,
      },
      option:{
        type: String,
        required: false,
      },
      createNewPicto:{
        type: Boolean,
        required: false,
      }
    },
    data() {
      return {
        betCategorie: this.option ? this.option : '',
        betLabel: this.bet.label ? this.bet.label : '',
      }
    },
    methods: {
      chooseCategorie(categorie) {
        this.betCategorie = categorie;
        console.log('categorie : ', this.betCategorie)
      },
      createNewBet(){
        this.$emit('createNewBet')
      },
      blurSaveInput(){
        console.log('save');
        const {betCategorie, betLabel} = this;
        this.$emit('saveInput', {id: this.bet.id, betCategorie, betLabel})
      }
    },
    updated () {
      console.log('betlabel : ', this.betLabel);
      console.log('this.option', this.option);
    },
  }
</script>

<style lang="scss" scoped>

</style>