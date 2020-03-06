<template>
	<v-expansion-panel :class="[goodResultOrNotColor]" dark="false">
		<v-expansion-panel-header>{{ bet.label }}</v-expansion-panel-header>
		<v-expansion-panel-content>
			<v-row>
				<v-col>
					<v-sheet
						v-if="bet.result"
						:class="[colorBackgroundLight, darkText, spaceInside]"
						>✔️ Résultat :
						{{ bet.result.name ? bet.result.name : bet.result }}</v-sheet
					>
					<v-sheet v-else :class="[colorBackgroundLight, darkText, spaceInside]"
						>Aucun résultat renseigné. 😴</v-sheet
					>
				</v-col>
				<v-col>
					<v-sheet
						v-if="bet.betsubmited !== null"
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
		mounted() {
			// console.log("this.betSubmited", this.betSubmited);
			// console.log("this.bet", this.bet);
		},
		computed: {
			goodResultOrNotColor: function() {
				if (this.bet.betsubmited !== undefined) {
					if (this.bet.result === this.bet.betsubmited.result) {
						return this.colorSuccess;
					}
					return colorErrorModal;
				}
				return this.colorBackgroundDark;
			},
			isGoodResult: function() {
				// console.log(" ");
				// console.log("this.bet", this.bet);
				if (this.bet.betsubmited !== null) {
					// console.log(
					// 	"this.bet.betsubmited.result",
					// 	this.bet.betsubmited.result
					// );
					// console.log("this.bet.result", this.bet.result);
					if (this.bet.result === this.bet.betsubmited.result) {
						return true;
					}
					return false;
				}
				return false;
			}
		}
	};
</script>

<style></style>
