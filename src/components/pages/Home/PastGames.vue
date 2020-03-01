<template>
<section class="mt-5">
	<p class="display-1 mb-5" :class="[whiteText]">Matchs précédents</p>
	<v-row class="row__vignet__pastgame">
		<v-col class="col__vignet__pastgame" :key="i"  v-for="(game,i) in games" >
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
	components:{
		Vignet
	},
	props:{
		games: Array,
	},
	data(){
		return{
			colorBackgroundLight,
			spaceInside,
			whiteText,
			darkText
		}
	},

}
</script>

<style lang="scss" scoped>
.row__vignet__pastgame{
	overflow-x: scroll;
	flex-wrap: nowrap;
	scrollbar-width: thin;
	.col__vignet__pastgame{
		min-width: 80vw;
	}
}
</style>