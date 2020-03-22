<template>
	<section class="mt-5">
		<p class="display-1 mb-5" :class="[whiteText]">Matchs précédents</p>
		<v-row class="row__vignet__pastgame">
			<v-col
				class="col__vignet__pastgame"
				:key="i"
				v-for="(game, i) in games"
			>
				<Vignet :game="game" />
			</v-col>
		</v-row>
	</section>
</template>

<script>
/* eslint-disable no-console */
import {
	colorBackgroundLight,
	// colorBackgroundDark,
	// colorErrorModal,
	// colorSuccess,
	// colorBtn,
	darkText,
	spaceInside,
	whiteText
} from '../../../style/colors.vars';
import Vignet from '../../organisms/Vignet';
export default {
	components: {
		Vignet
	},
	props: {
		games: Array
	},
	data() {
		return {
			colorBackgroundLight,
			spaceInside,
			whiteText,
			darkText
		};
	}
};
</script>

<style lang="scss">
@import '../../../style/mixins';
.row__vignet__pastgame {
	overflow-x: scroll;
	flex-wrap: nowrap;
	scrollbar-width: thin;
	.col__vignet__pastgame {
		min-width: 90%;
		@include media-min('laptop') {
			min-width: 50%;
		}
		// must rework this part with scoop and v-deep
		.v-expansion-panel {
			.row {
				.col {
					@include media-min-max('phone', 'tabletmax') {
						padding: 0px;
					}
					&:nth-child(1) {
						.v-sheet {
							border-radius: 4px 0 0 4px;
							height: 100%;
							display: flex;
							align-items: center;
						}
					}
					&:nth-child(2) {
						.v-sheet {
							border-radius: 0 4px 4px 0;
							position: relative;
							&:before {
								content: '';
								position: absolute;
								height: 100%;
								width: 1px;
								background: #141414;
								opacity: 0.5;
								left: -1px;
								top: 0;
							}
						}
					}
				}
			}
		}
	}
}
</style>
