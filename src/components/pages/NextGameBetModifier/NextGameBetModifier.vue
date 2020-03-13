<template>
	<div class="NGBetModifierPage">
		<h1 class="ma-5">Modification de ton paris</h1>
		<v-sheet
			class="pa-2 ma-5"
			:class="[colorBackgroundLight, darkText]"
			v-if="dataLoaded"
		>
			<h2>{{ nextgame.city }}</h2>

			<div :key="i" v-for="(bet, i) in nextgame.betslist">
				<label>{{ bet.label }}</label>
				<BetsSwitch
					:type="bet.__component"
					:defaultValue="bet.betsubmited.result"
				/>
			</div>
			<div class="NGBetModifierPage__submit">
				<v-btn @click="submitModification">
					Modifier
				</v-btn>
			</div>
		</v-sheet>
	</div>
</template>

<script>
	/* eslint-disable no-console */
	import {
		colorBackgroundLight,
		colorBackgroundDark,
		darkText
		// spaceInside
	} from "@/style/colors.vars";
	import BetsSwitch from "@/components/atoms/betsSwitch";
	import { mapState } from "vuex";
	export default {
		components: {
			BetsSwitch
		},
		data() {
			return {
				colorBackgroundLight,
				colorBackgroundDark,
				darkText,
				dataLoaded: false
			};
		},
		mounted() {
			this.initApp();
			console.log("this.state", this.$store.state);
			if (this.dataLoaded) {
				console.log("mapstate", this.nextgame.betslist[0]);
			}
		},
		computed: {
			...mapState({
				nextgame: state => state.gamedays.nextGame
			})
		},
		methods: {
			submitModification: function() {
				this.$store.dispatch("");
			},
			initApp: async function() {
				if (this.$store.state.gamedays === null) {
					const getGames = await this.$store.dispatch("getGamedays");
					const getBets = await this.$store.dispatch("getAllBets");
					if (getGames.statusText === "OK" && getBets.statusText === "OK") {
						this.dataLoaded = true;
					}
				} else {
					this.dataLoaded = true;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.NGBetModifierPage {
		&__submit {
		}
	}
</style>
