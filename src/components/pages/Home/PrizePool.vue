
<template>
	<div class="my-5 prizePool" v-if="dataLoaded">
		<p class="display-1 mb-5" :class="[whiteText]">Montant de tes gains</p>
		<v-sheet
			class="prizePool__container"
			:class="[spaceInside, colorBackgroundLight, darkText]"
		>
			<p class="display-2 mb-0 prizePool__container__total">
				<b> {{ prizePool.total }}€ </b>
			</p>
		</v-sheet>
	</div>
	<div v-else>
		<v-progress-circular
			:size="130"
			:width="7"
			:color="colorBackgroundLight"
			indeterminate
		/>
	</div>
</template>

<script>
	/* eslint-disable no-console */
	import { mapState, mapActions } from "vuex";
	import {
		colorBackgroundLight,
		colorBackgroundDark,
		whiteText,
		darkText,
		spaceInside
	} from "../../../style/colors.vars";
	export default {
		data() {
			return {
				colorBackgroundLight,
				colorBackgroundDark,
				whiteText,
				darkText,
				spaceInside,
				dataLoaded: false
			};
		},
		computed: {
			...mapState({
				prizePool: state => state.prizepool
			})
		},
		methods: {
			...mapActions(["getPrizePool"])
		},
		async mounted() {
			try {
				await this.getPrizePool()
				this.dataLoaded = true;
			} catch (err) {
				throw `Problème dans la récupération du prizepool : ${err}`
			}
		}
	};
</script>

<style lang="scss" scoped>
	.prizePool {
		&__container {
			&__total {
				color: #00897b;
			}
		}
	}
</style>
