<template>
	<div>
		<v-sheet class="pa-2 ma-5" v-if="dataLoaded">
			<h1>{{nextgame.city}}</h1>
		</v-sheet>
	</div>
</template>

<script>
/* eslint-disable no-console */
import { mapState } from 'vuex'
	export default {
		data() {
			return {
				dataLoaded : false
			}
		},
		mounted () {
			this.initApp();
			console.log('this.state', this.$store.state);
			if(this.dataLoaded){
				console.log('mapstate', this.nextgame);
			}
		},
		computed: {
			...mapState({
				nextgame: state => state.gamedays.nextGame
			})
		},
		methods: {
			initApp: async function() {
				if(this.$store.state.gamedays === null) {
					const getGames = await this.$store.dispatch('getGamedays');
					const getBets = await this.$store.dispatch('getAllBets');
					if(getGames.statusText === "OK" && getBets.statusText === "OK"){
						this.dataLoaded = true;
					}
				}
				else{
					this.dataLoaded = true;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>