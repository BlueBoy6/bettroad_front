<template>
	<v-overlay :absolute="false" :opacity="1" :value="isShow" :z-index="99">
		<v-container ref="vbetcontainer" class="layer__bets">
			<v-sheet
				ref="vbetcontainerSheet"
				width="100%"
				:class="[spaceInside, colorBackgroundLight, darkText]"
			>
				<div
					class="headline font-weight-bold"
					:class="spaceInside"
					v-for="bet in game.betslist"
					v-bind:key="bet.label"
				>
					<p :class="darkText">{{ bet.label }}</p>
					<BetSwitch
						:type="bet.__component"
						:idBet="bet.id"
						expanded
						@input="e => changeValueBet(e, bet.id, bet.label)"
					/>
				</div>
				<v-snackbar absolute v-model="error.status" :color="colorErrorModal"
					>{{ error.message }}
					<v-btn
						class="mx-2"
						fab
						dark
						small
						:color="colorBackgroundDark"
						@click="() => (error.status = false)"
					>
						<v-icon dark>mdi-close</v-icon>
					</v-btn>
				</v-snackbar>
				<v-row :class="spaceInside">
					<v-col justify="center" align="center">
						<v-btn :color="colorBtn" @click="submitBet" large width="100%"
							>Prends mon paris là !</v-btn
						>
						<br />
						<v-btn
							:color="colorBtn"
							@click="$emit('close')"
							width="100%"
							large
							text
							>Peut-être plus tard !</v-btn
						>
					</v-col>
				</v-row>
			</v-sheet>
		</v-container>
	</v-overlay>
</template>

<script>
	/* eslint-disable no-console */
	import BetSwitch from "../../../atoms/betsSwitch";
	import {
		colorBackgroundLight,
		colorBackgroundDark,
		colorErrorModal,
		colorSuccess,
		colorBtn,
		whiteText,
		darkText,
		spaceInside
	} from "../../../../style/colors.vars";
	export default {
		components: {
			BetSwitch
		},
		props: {
			isShow: {
				type: Boolean,
				default: false,
				required: true
			},
			game: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				betsController: [],
				error: { status: false, message: "" },
				colorBackgroundLight,
				colorBackgroundDark,
				colorErrorModal,
				colorSuccess,
				colorBtn,
				whiteText,
				darkText,
				spaceInside
			};
		},
		methods: {
			changeValueBet: function(e, idBet, label) {
				const betValueFormated = {
					idBet,
					value: e.value,
					type: e.type,
					label
				};
				const indexOfBet = this.betsController.findIndex(
					bet => bet.idBet === idBet
				);
				if (indexOfBet === -1)
					return (this.betsController = [
						...this.betsController,
						betValueFormated
					]);
				return (this.betsController[indexOfBet] = betValueFormated);
			},
			submitBet: function() {
				if (this.betsController.length < this.game.betslist.length) {
					return (this.error = {
						status: true,
						message: "Tu n'as pas remplies tous les champs !"
					});
				}
				const betToSubmit = {
					gamedayId: this.game.id,
					bets: this.betsController
				};
				this.$store.dispatch("postBets", betToSubmit).then(() => {
					this.nextGameSubmited = this.$store.state.gamedays.nextGame.betslist;
				});
				this.$emit("close");
			}
		}
	};
</script>

<style lang="scss" scoped></style>
