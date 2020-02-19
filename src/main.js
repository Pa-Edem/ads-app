import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import * as fb from 'firebase';
import BuyModalComponent from './components/Shared/BuyModal';

Vue.component('app-buy-modal', BuyModalComponent);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
	created() {
		fb.initializeApp({
			apiKey: 'AIzaSyBXClQGoAs91jF6ezSNnlWHTS0TR3CdJ3Q',
			authDomain: 'ads-board-project.firebaseapp.com',
			databaseURL: 'https://ads-board-project.firebaseio.com/',
			projectId: 'ads-board-project',
			storageBucket: 'ads-board-project.appspot.com',
			messagingSenderId: '520476952897',
			appId: '1:520476952897:web:7f9c954793e2571f'
		});

		fb.auth().onAuthStateChanged(user => {
			if (user) {
				this.$store.dispatch('autoLoginUser', user);
			}
		});

		this.$store.dispatch('fetchAds');
	}
}).$mount('#app');
