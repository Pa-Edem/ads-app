import store from '../store.js';

export default function(to, from, next) {
	if (store.getters.user) {
		next();
	} else {
		next('/login?loginError=true');
	}
}
