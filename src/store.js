import Vue from 'vue';
import Vuex from 'vuex';

import ads from '@/store/ads';
import user from '@/store/user';
import common from '@/store/common';
import orders from '@/store/orders';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		ads,
		user,
		common,
		orders
	}
});
