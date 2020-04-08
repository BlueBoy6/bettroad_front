<template>
	<v-navigation-drawer
		v-model="openMenu"
		fixed
		temporary
		justify="center"
	>
		<v-row class="mx-0">
			<v-col class="px-10">
                <p class="mb-0 body-2">
                    {{_user.role}}
                </p>
				<p class="mb-0 subtitle-1 team-label">
					{{ _user.team.name }}
				</p>
				<p class="mb-5 headline">
					<b>{{ _user.name.toUpperCase() }}</b>
				</p>
                
                <v-btn to="/moderator-space" :class="colorBtn" v-if="_user.role === 'Moderator'" block>
					Espace de modération
				</v-btn>
                <v-divider class="my-5" />
				<v-btn width="100%" :class="colorBtn" @click="disconnect">
					Deconnexion
				</v-btn>
			</v-col>
		</v-row>
	</v-navigation-drawer>
</template>

<script>
import { colorBtn } from '@/style/colors.vars';
import { mapState } from 'vuex';
	export default {
        props: {
            value: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                colorBtn
            }
        },
        computed: {
            ...mapState({
                _user: state => state.user
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

<style lang="scss" scoped>
.team-label{
    color: #9FA8DA;
}
</style>
