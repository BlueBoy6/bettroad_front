<template>
	<div class="my-5 prizePool">
		<p class="display-1 mb-5" :class="[whiteText]">Ta cagnotte</p>
		<v-sheet
			class="prizePool__container"
			:class="[spaceInside, colorBackgroundLight, darkText]"
		>
			<p class="display-2 mb-0 prizePool__container__total">
				<b> {{ prizePool.total }}€ </b>
			</p>
		</v-sheet>
	</div>
</template>

<script>
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
				spaceInside
			};
		},
		computed: {
			...mapState({
				prizePool: state => state.prizePool
			})
		},
		methods: {
			...mapActions(["getPrizePool"])
		},
		mounted() {
			this.getPrizePool();
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
