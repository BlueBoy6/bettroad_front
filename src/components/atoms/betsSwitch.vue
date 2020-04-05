<template>
	<div class="switcher mb-2" v-if="loaded">
		<v-btn-toggle
			v-if="type === 'betcategories.yes-no-choice'"
			:class="[expanded && 'expanded']"
		>
			<v-btn
				v-bind:key="value"
				v-for="value in YesNo"
				:class="{
					indigo: defaultValueInput === value && itemSelected === null,
					'indigo darken-2': itemSelected === value,
				}"
				@click="() => itemSelectedAction(value)"
				>{{ value }}</v-btn
			>
		</v-btn-toggle>
		<v-select
			label="Choisi le joueur"
			v-if="type === 'betcategories.player-choice'"
			:items="_teammateslist"
			@change="itemSelectedAction"
			:background-color="colorBackgroundDark"
			:value="defaultValueInput"
			solo
		/>
		<v-select
			label="Choisi l'équipe"
			v-if="type === 'betcategories.team-choice'"
			:items="_teamslist"
			:background-color="colorBackgroundDark"
			@change="itemSelectedAction"
			:value="defaultValueInput"
			solo
		/>
		<v-text-field
			v-if="type === 'betcategories.number-choice'"
			type="number"
			color="white"
			@input="changeInputField"
			:background-color="colorBackgroundDark"
			:value="defaultValueInput"
			outlined
			flat
		/>
	</div>
	<v-row v-else>
		<v-col cols="8" offset="2" class="loading" align="center">
			<v-progress-circular
				:size="20"
				:width="5"
				:color="colorBackgroundDark"
				indeterminate
			/>
		</v-col>
	</v-row>
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
	spaceInside,
} from '../../style/colors.vars';
import { mapState } from 'vuex';
export default {
	props: {
		type: String,
		items: Array,
		expanded: Boolean,
		idBet: Number,
		defaultValue: [String, Object, Number],
	},
	beforeMount() {
		if (this.type === 'betcategories.player-choice') {
			this.$store.dispatch('getTeammates').then(() => {
				this.loaded = true;
			});
			this.loaded = true;
		} else if (this.type === 'betcategories.team-choice') {
			this.$store.dispatch('getTeams').then(() => {
				this.loaded = true;
			});
		} else {
			this.loaded = true;
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
			colorBtn,
		};
	},
	computed: {
		choiceSwitcher: function () {
			return this.colorInputs;
		},
		...mapState({
			_teammateslist: (state) => state.teammates.players.map((p) => p.name),
			_teammatesListFull: (state) => state.teammates.players,
			_teamslist: (state) =>
				state.teams.teamsChampionship.map((t) => t.city),
			_teamslistFull: (state) => state.teams.teamsChampionship,
		}),
		defaultValueInput: function () {
			if (this.defaultValue) {
				if (this.type === 'betcategories.player-choice')
					return this.defaultValue.name;
				if (this.type === 'betcategories.team-choice')
					return this.defaultValue.city;
				return this.defaultValue;
			}
			return '';
		},
	},
	methods: {
		changeInputField: function (e) {
			this.$emit('input', {
				idBet: this.idBet,
				value: e,
				type: this.type,
			});
		},
		itemSelectedAction: function (e) {
			this.itemSelected = e;
			let infoFilter;
			if (this.type === 'betcategories.team-choice') {
				infoFilter = this._teamslistFull.find((team) => team.city === e);
			} else if (this.type === 'betcategories.player-choice') {
				infoFilter = this._teammatesListFull.find(
					(player) => player.name === e
				);
			} else if (this.type === 'betcategories.yes-no-choice') {
				infoFilter = e;
			}
			const emitObj = {
				idBet: this.idBet,
				value: infoFilter,
				type: this.type,
			};
			this.$emit('input', emitObj);
		},
	},
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
.switcher {
	.v-text-field__details {
		margin: 0;
		padding: 0;
		min-height: 0;
		display: none;
	}
}
.v-text-field .v-input__control input[type='number'] {
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: textfield;
}
</style>
