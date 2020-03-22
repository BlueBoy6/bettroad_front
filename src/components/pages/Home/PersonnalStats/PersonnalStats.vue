<template>
	<v-sheet
		class="mb-5 mt-5"
		:class="[spaceInside, colorBackgroundLight, darkText]"
	>
		<h2>Statistiques personnels</h2>
		<v-sparkline
			:value="pgPercent"
			color="#00897b"
			height="100"
			padding="20"
			stroke-linecap="round"
			smooth
		>
		</v-sparkline>
		<v-row>
			<v-col
				align="center"
				justify="center"
				class="px-1 px-lg-4"
				:key="pg.day.dayNumber"
				v-for="pg in pgData"
			>
				<v-tooltip :position-y="1" bottom :color="colorBackgroundDark">
					<template v-slot:activator="{ on }">
						<div v-on="on" class="pa-1 pa-lg-4" :class="[darkText]">
							<span>J{{ pg.day.dayNumber }}</span>
						</div>
					</template>
					<div align="center" justify="center">
						<div>{{ pg.day.fr }}</div>
						<div>{{ pg.city }}</div>
					</div>
				</v-tooltip>
			</v-col>
		</v-row>
	</v-sheet>
</template>

<script>
/* eslint-disable no-console */
import {
	colorBackgroundLight,
	colorBackgroundDark,
	colorSuccess,
	whiteText,
	colorText,
	darkText,
	spaceInside
} from '../../../../style/colors.vars';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			colorBackgroundLight,
			colorBackgroundDark,
			colorSuccess,
			whiteText,
			darkText,
			colorText,
			spaceInside
		};
	},
	computed: {
		...mapState({
			pgPercent: state =>
				state.gamedays.pastGames.map(game => game.stats.successPercent),
			pgDaysNumber: state =>
				state.gamedays.pastGames.map(game => game.day.dayNumber),
			pgData: state => state.gamedays.pastGames
		})
	},
	mounted() {
		// console.log('state : ', this.$store.state)
		console.log('pastgames : ', this.pgDaysNumber);
	}
};
</script>

<style lang="scss" scoped></style>
