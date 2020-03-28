<template>
	<v-expansion-panel :class="[goodResultOrNotColor]" dark="false">
		<v-expansion-panel-header>{{ bet.label }}</v-expansion-panel-header>
		<v-expansion-panel-content>
			<v-row class="row__result">
				<v-col class="row__result__good">
					<v-sheet
						v-if="bet.result"
						:class="[colorBackgroundLight, darkText, spaceInside]"
						>✔️ Résultat :
						{{ bet.result.name ? bet.result.name : bet.result }}
					</v-sheet>
					<v-sheet v-else :class="[colorBackgroundLight, darkText, spaceInside]"
						>Aucun résultat renseigné. 😴</v-sheet
					>
				</v-col>
				<v-col class="row__result__user">
					<v-sheet
						v-if="bet.betsubmited"
						:class="[colorBackgroundLight, darkText, spaceInside]"
						>{{ isGoodResult ? "✔️" : "❌" }} Ton paris :
						{{
							bet.betsubmited.result.name
								? bet.betsubmited.result.name
								: bet.betsubmited.result
						}}</v-sheet
					>
					<v-sheet v-else :class="[colorErrorModal, whiteText, spaceInside]"
						>👎 Hé con, t'as pas parié là !</v-sheet
					>
				</v-col>
			</v-row>
		</v-expansion-panel-content>
	</v-expansion-panel>
</template>

<script>
	/* eslint-disable no-console */
	import {
		colorBackgroundLight,
		colorBackgroundDark,
		colorErrorModal,
		colorSuccess,
		// colorBtn,
		darkText,
		spaceInside,
		whiteText
	} from "../../style/colors.vars";
	export default {
		props: {
			bet: Object
		},
		data() {
			return {
				colorBackgroundLight,
				colorBackgroundDark,
				spaceInside,
				whiteText,
				colorSuccess,
				colorErrorModal,
				darkText
			};
		},

		computed: {
			goodResultOrNotColor: function() {
				if (this.bet.betsubmited) {
					if (this.bet.success) {
						return this.colorSuccess;
					}
					return this.colorErrorModal;
				}
				return this.colorBackgroundDark;
			},
			isGoodResult: function() {
				if (this.bet.success) {
					return true;
				}
				return false;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.row__result {
		&__good {
			padding-right: 0px;
		}
		&__user {
			padding-left: 0px;
		}
	}
</style>
