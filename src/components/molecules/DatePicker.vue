<template>
<div>
  <p class="headline font-weight-bold" @click="dateToggle">{{ value.fr }}</p>
  <v-dialog
      v-model="dialog"
      width="300"
    >
      <v-date-picker
        v-model="date"
        :first-day-of-week="0"
        locale="fr-fr"
      />
  </v-dialog>
</div>
</template>

<script>
  /* eslint-disable no-console */
  import { fullFormatterDate } from '@/helpers/calendar'
  export default {
    props: {
      value: {
        type: Object,
        required: false 
      },
    },
    data() {
      return {
        dialog: false,
      }
    },
    computed: {
      date: {
        get(){
          console.log('date : ', this.value)
          return this.value.en;
        },
        set(newDate){
          console.log('new date : ', newDate);
          return this.$emit('input', this.fullFormatDate(newDate))
        }
      }
    },
    methods: {
      fullFormatDate(date){
        return fullFormatterDate(date);
      },
      dateToggle(){
        this.dialog = !this.dialog;
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>