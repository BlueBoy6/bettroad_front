<template>
	<v-sheet class="mb-3" :class="[spaceInside, colorBackgroundLight, darkText]">
		<p class="subtitle-1 mb-0">
			<span>{{ game.city }}</span>
		</p>
		<p class="headline font-weight-bold mb-1">{{ game.day.fr }}</p>
		<p class="subtitle">
			{{ percentSuccess }}
		</p>
		<v-expansion-panels v-if="game.betslist !== null">
			<ExpansionPannelResult
				:bet="bet"
				:key="i"
				v-for="(bet, i) in game.betslist"
			/>
		</v-expansion-panels>
	</v-sheet>
</template>

<script>
/* eslint-disable no-console */
import ExpansionPannelResult from './ExpansionPannelResult';
import {
	colorBackgroundLight,
	// colorBackgroundDark,
	// colorErrorModal,
	// colorSuccess,
	// colorBtn,
	darkText,
	spaceInside,
	whiteText
} from '../../style/colors.vars';
export default {
	components: {
		ExpansionPannelResult
	},
	props: {
		game: Object
	},
	data() {
		return {
			colorBackgroundLight,
			spaceInside,
			whiteText,
			darkText
		};
	},
	mounted() {
		// console.log('game', this.game);
	},
	computed: {
		betlabel() {
			return this.game.betslist.label;
		},
		percentSuccess() {
			if (this.game.successPercent) {
				let pictoSwitcher;
				switch (this.game.successPercent) {
					case this.game.successPercent < 25:
						return (pictoSwitcher = '💩');

					case this.game.successPercent < 50:
						return (pictoSwitcher = '🙄');

					case this.game.successPercent < 75:
						return (pictoSwitcher = '👌');

					case this.game.successPercent > 75:
						return (pictoSwitcher = '👑');
				}
				if (this.game.successPercent < 25) pictoSwitcher = '💩';
				if (this.game.successPercent >= 25 && this.game.successPercent < 50)
					pictoSwitcher = '🙄';
				if (this.game.successPercent >= 50 && this.game.successPercent < 75)
					pictoSwitcher = '👌';
				if (this.game.successPercent >= 75) pictoSwitcher = '👑';
				return `${pictoSwitcher} ${this.game.successPercent}% de réussite`;
			}
			return 'Aucun pourcentage de réussite existant pour ce paris..';
		}
	}
};
</script>

<style></style>
