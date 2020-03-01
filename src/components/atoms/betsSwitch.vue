<template>
	<div class="switcher">
		<v-btn-toggle
			v-if="type === 'betcategories.yes-no-choice'"
			:class="[expanded && 'expanded']"
		>
			<v-btn
				v-bind:key="bool"
				v-for="bool in YesNo"
				:class="itemSelected === bool && colorBtn"
				@click="() => itemSelectedAction(bool)"
				>{{ bool }}</v-btn
			>
			<!-- <v-btn :class="choiceSwitcher" @click="itemSelected = 'Non'">Non</v-btn> -->
		</v-btn-toggle>
		<v-select
			label="Choisi le joueur"
			v-if="type === 'betcategories.player-choice' && loaded"
			:items="playersList"
			@change="itemSelectedAction"
			:background-color="colorBackgroundDark"
			solo
		/>
		<v-select
			label="Choisi l'équipe"
			v-if="type === 'betcategories.team-choice' && loaded"
			:items="teamsList"
			@change="itemSelectedAction"
			:background-color="colorBackgroundDark"
			solo
		/>
		<v-text-field
			v-if="type === 'betcategories.number-choice'"
			color="white"
			@input="changeInputField"
			:background-color="colorBackgroundDark"
			outlined
			flat
		/>
	</div>
</template>

<script>
/* eslint-disable no-console */
import {
	colorInputs,
	colorBackgroundLight,
	colorBackgroundDark,
	colorBtn,
	whiteText,
	darkText,
	spaceInside
} from '../../sass/colors.vars';

export default {
	props: {
		type: String,
		items: Array,
		expanded: Boolean,
		id: Number,
		idBet: Number
	},
	beforeMount() {
		if (this.type === 'betcategories.player-choice') {
			this.$store.dispatch('getTeammates').then(result => {
				console.log('dispatcher  : ', result);
				this.itemsList = result;
				this.loaded = true;
			});
		} else if (this.type === 'betcategories.team-choice') {
			this.$store.dispatch('getTeams').then(result => {
				console.log('dispatcher  : ', result);
				this.itemsList = result;
				this.loaded = true;
			});
		}
	},
	data() {
		return {
			itemSelected: null,
			colorBackgroundLight,
			colorBackgroundDark,
			YesNo: ['Oui', 'Non'],
			itemsList: null,
			loaded: false,
			whiteText,
			darkText,
			spaceInside,
			colorInputs,
			colorBtn
		};
	},
	computed: {
		choiceSwitcher: function() {
			return this.colorInputs;
		},
		playersList: function() {
			return this.itemsList.map(v => v.name);
		},
		teamsList: function() {
			return this.itemsList.map(v => v.city);
		}
	},
	methods: {
		changeInputField: function(e) {
			this.$emit('input', {
				id: this.id,
				idBet: this.idBet,
				value: e,
				type: this.type
			});
		},
		itemSelectedAction: function(e) {
			this.itemSelected = e;
			let infoFilter;
			if (this.type === 'betcategories.team-choice') {
				infoFilter = this.$store.state.teamsChampionship.filter(
					team => team.city === e
				);
			} else if (this.type === 'betcategories.player-choice') {
				infoFilter = this.$store.state.teamMates.filter(
					player => player.name === e
				);
			} else if (this.type === 'betcategories.yes-no-choice') {
				infoFilter = e;
			}

			this.$emit('input', {
				id: this.id,
				idBet: this.idBet,
				value: infoFilter,
				type: this.type
			});
		}
	}
};
</script>

<style lang="scss">
.v-menu__content {
	scrollbar-width: thin;
}
.expanded {
	width: 100%;
	& > * {
		display: flex;
		flex-grow: 1;
	}
}
</style>
