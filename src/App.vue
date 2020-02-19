<template>
	<v-app>
		<v-navigation-drawer app temporary v-model="drawer">
			<v-list flat>
				<v-list-item-group color="primary">
					<v-list-item v-for="link of links" :key="link.title" :to="link.url">
						<v-icon left v-text="link.icon"></v-icon>
						<v-list-item-content>
							<v-list-item-title v-text="link.title"></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item v-if="isUserLoggedIn" @click="onLogout">
						<v-icon left v-text="'exit_to_app'"></v-icon>
						<v-list-item-content>
							<v-list-item-title v-text="'Logout'"></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app dark color="primary">
			<v-app-bar-nav-icon
				@click="drawer = !drawer"
				class="hidden-md-and-up"
			></v-app-bar-nav-icon>
			<v-toolbar-title>
				<router-link tag="span" to="/" class="pointer">ADS app</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn text v-for="link of links" :key="link.title" :to="link.url">
					<v-icon left>{{ link.icon }}</v-icon>
					{{ link.title }}
				</v-btn>
				<v-btn v-if="isUserLoggedIn" text @click="onLogout">
					<v-icon left>exit_to_app</v-icon>
					Logout
				</v-btn>
			</v-toolbar-items>
		</v-app-bar>
		<v-content>
			<router-view />
		</v-content>
		<template v-if="error">
			<v-snackbar
				color="red accent-2"
				:multi-line="true"
				:timeout="5000"
				@input="closeError"
				:value="true"
			>
				{{ error }}
				<v-btn dark text @click="closeError">Close</v-btn>
			</v-snackbar>
		</template>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			drawer: false
		};
	},
	computed: {
		error() {
			return this.$store.getters.error;
		},
		isUserLoggedIn() {
			return this.$store.getters.isUserLoggedIn;
		},
		links() {
			if (this.isUserLoggedIn) {
				return [
					{ title: 'Orders', icon: 'bookmark_border', url: '/orders' },
					{ title: 'New ad', icon: 'note_add', url: '/new' },
					{ title: 'My ads', icon: 'list', url: '/list' }
				];
			}
			return [
				{ title: 'Login', icon: 'lock', url: '/login' },
				{ title: 'Registration', icon: 'face', url: '/registration' }
			];
		}
	},
	methods: {
		closeError() {
			this.$store.dispatch('clearError');
		},
		onLogout() {
			this.$store.dispatch('logoutUser');
			this.$router.push('/');
		}
	}
};
</script>

<style scoped>
.pointer {
	cursor: pointer;
}
</style>
