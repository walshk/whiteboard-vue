import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		settings: {
			drawRadius: 20,
		},
	},
	getters: {
		settings(state): Object {
			return state.settings;
		},
	},
	mutations: {},
	actions: {},
	modules: {},
});
