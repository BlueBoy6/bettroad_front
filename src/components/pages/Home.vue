<template>
	<v-container v-if="dataLoaded" class="dashboard">
		<v-row>
			<v-col cols="8" offset="2" :class="[]">
				<p class="display-1 mb-5" :class="[whiteText]">
					Prochain match
				</p>
				<v-card
					class="display-1 event__card"
					:class="[spaceInside, colorBackgroundLight, darkText]"
				>
					<p class="subtitle-1 mb-0">
						<v-icon :color="colorBackgroundDark"
							>mdi-map-marker-radius</v-icon
						>{{ gamedays.next.city }}
					</p>
					<p class="headline font-weight-bold">
						{{ gamedays.next.day }}
					</p>
					<v-row>
						<v-col>
							<v-card
								:key="bet.id"
								v-for="bet in gamedays.next.betstypes"
								class="ma-1 pa-3 subtitle-1 bets__available"
								:class="[colorBackgroundDark, whiteText]"
								elevation="5"
								width="100%"
							>
								{{ bet.name }}
							</v-card>
						</v-col>
					</v-row>
					<v-row justify="end">
						<v-col cols="auto">
							<v-btn
								:class="colorBtn"
								@click="nextGameOverlay = true"
								large
								float-right
								>Paris-là !</v-btn
							>
						</v-col>
					</v-row>
				</v-card>
				<v-overlay
					:absolute="false"
					:opacity="1"
					:value="nextGameOverlay"
					:z-index="99"
				>
					<v-container>
						<v-row>
							<v-col>
								<p>YOLO</p>
								<v-btn @click="nextGameOverlay = false">CLOSE</v-btn>
							</v-col>
						</v-row>
					</v-container>
				</v-overlay>
			</v-col>
		</v-row>
	</v-container>
	<v-container v-else>
		<v-row>
			<v-col cols="8" offset="2" class="loading">
				<v-progress-circular
					:size="130"
					:width="7"
					:color="colorBackgroundLight"
					indeterminate
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
/* eslint-disable no-console */
import { getGameDays } from '../../helpers/calendar';
import { getBetsTypeCategories } from '../../helpers/betsdata';
import {
	colorBackgroundLight,
	colorBackgroundDark,
	whiteText,
	darkText,
	spaceInside
} from '../../sass/colors.vars';
export default {
	data() {
		return {
			dataLoaded: false,
			gamedays: null,
			nextGameOverlay: false,
			colorBackgroundLight,
			colorBackgroundDark,
			whiteText,
			darkText,
			spaceInside
		};
	},
	beforeCreate() {},
	mounted: async function() {
		this.fetchGameDatas(this.$store.state.user.token);
	},
	methods: {
		fetchGameDatas: async function(token) {
			const gamedaysdata = await getGameDays(token);
			const betsCategoriesData = await getBetsTypeCategories(token);
			if (gamedaysdata) {
				this.$store.commit('storeBetsType', betsCategoriesData);
				this.$store.commit('storeGameDays', [
					betsCategoriesData,
					gamedaysdata
				]);
				if (this.$store.state.gamedays.next !== null) {
					this.gamedays = this.$store.state.gamedays;
					this.dataLoaded = true;
				}
			}
		}
	}
};
</script>

<style lang="scss">
// $card-adjacent-sibling-text-padding-top: 45px;
.container.dashboard {
	min-height: 100%;
	& > .row {
		min-height: 100%;
		.col.loading {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
.v-card {
	.event__card {
		border-radius: 6px;
		text-align: left;
		p.headline {
			margin-bottom: 0px;
		}
		.bets__available {
			width: 100%;
			border-radius: 4px;
		}
	}
}
</style>
