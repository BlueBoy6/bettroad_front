<template>
	<!-- SI UN PARI A DEJA ETE SOUMIS -->
	<v-row>
		<v-col class="py-0">
			<p class="title">T'as parié sur</p>
			<div
				:key="betted.id"
				v-for="betted in nextGameBetted"
				class="bets__submited mt-2"
			>
				<p
					class="pa-2 ma-0 body-2"
					:class="[colorBackgroundDark, whiteText]"
				>
					{{ betted.label }}
				</p>
				<p
					v-if="betted.__component === 'betcategories.player-choice'"
					class="pa-2 ma-0 body-2"
				>
					{{ betted.betsubmited.result.name }}
				</p>
				<p
					v-else-if="betted.__component === 'betcategories.team-choice'"
					class="pa-2 ma-0 body-2"
				>
					{{ betted.betsubmited.result.name }} -
					{{ betted.betsubmited.result.city }}
				</p>
				<p v-else class="pa-2 ma-0 body-2">
					{{ betted.betsubmited.result }}
				</p>
			</div>
			<v-btn class="mt-6" large to="/nextgame-modifier">
				<v-icon small dark class="mr-2">mdi-pencil</v-icon> Modifier mon
				pari
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
/* eslint-disable no-console */
import {
	colorBackgroundLight,
	colorBackgroundDark,
	colorErrorModal,
	colorSuccess,
	colorBtn,
	whiteText,
	darkText,
	spaceInside,
} from '../../../../style/colors.vars';

export default {
	data() {
		return {
			colorBackgroundLight,
			colorBackgroundDark,
			colorErrorModal,
			whiteText,
			darkText,
			spaceInside,
			colorBtn,
			colorSuccess,
		};
	},
	props: {
		nextGameBetted: {
			type: Array,
			required: true,
		},
	},
	mounted() {
		console.log('chit', this.nextGameBetted);
	},
};
</script>

<style lang="scss" scoped></style>
