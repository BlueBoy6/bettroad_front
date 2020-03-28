<template>
	<div class="my-5">
		<h2>Ta cagnotte :</h2>
		<v-sheet>
			YOLO
		</v-sheet>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	export default {
		computed: {
			...mapState({})
		},
		methods: {
			...mapActions(["getPrizePool"])
		},
		mounted() {
			this.getPrizePool(6);
		}
	};
</script>

<style lang="scss" scoped></style>
