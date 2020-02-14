<template>
	<div class="switcher">
		<v-btn-toggle
			v-if="type.name === 'Oui/Non'"
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
			v-if="type.name === 'Joueur'"
			:items="itemsList"
			@change="itemSelectedAction"
			:background-color="colorBackgroundDark"
			solo
		/>
		<v-text-field
			v-if="type.name === 'Nombre'"
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
		type: Object,
		items: Array,
		expanded: Boolean,
		id: Number,
		idBet: Number
	},
	data() {
		return {
			itemSelected: null,
			colorBackgroundLight,
			colorBackgroundDark,
			YesNo: ['Oui', 'Non'],
			itemsList: null,
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
			this.$emit('input', {
				id: this.id,
				idBet: this.idBet,
				value: e,
				type: this.type
			});
		}
	},
	mounted() {
		const teamate = this.$store.state.teamMates;
		this.itemsList = teamate;
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
