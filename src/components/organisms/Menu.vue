<template>
	<v-navigation-drawer
		v-model="openMenu"
		absolute
		temporary
		justify="center"
	>
		<v-row class="mx-0">
			<v-col class="px-10">
				<p class="mb-0 subtitle-1">
					{{ this.$store.state.user.team.name }}
				</p>
				<p class="mb-5 headline">
					<b>{{ this.$store.state.user.name.toUpperCase() }}</b>
				</p>
				<v-btn width="100%" :class="colorInputs" @click="disconnect">
					Deconnexion
				</v-btn>
			</v-col>
		</v-row>
	</v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
	export default {
        props: {
            value: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            ...mapState({
                
            }),
            openMenu: {
                get(){
                    return this.value; 
                },
                set(value){
                    return this.$emit('input', value)
                }
            }
        },
        methods: {
            disconnect: async function () {
                this.openMenu = false;
                try {
                    await this.$store.dispatch('logout');
                    this.$router.push({
                        path: '/',
                    });
                } catch (err) {
                    throw `Un problème est arrivé lors de la déconnexion ${err}`;
                }
            },
        },
    };
</script>

<style lang="scss" scoped></style>
