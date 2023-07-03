import Vue from 'vue';
import Vuex from 'vuex';

import { CanvasSettings } from '@/interfaces/canvasSettings';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		settings: {
			radius: 5,
			color: 'black',
		},
	},
	getters: {
		settings(state): object {
			return state.settings as CanvasSettings;
		},
	},
	mutations: {},
	actions: {},
	modules: {},
});
