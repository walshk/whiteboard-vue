import Vue from 'vue';
import Vuex from 'vuex';

import { CanvasSettings } from '@/interfaces/canvasSettings';
import { WhiteboardTool } from '@/enums/whiteboardTool';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		settings: {
			radius: 5,
			color: 'black',
			backdropColor: 'lightblue',
			currentTool: WhiteboardTool.Draw,
		},
	},
	getters: {
		settings(state): object {
			return state.settings as CanvasSettings;
		},
		currentTool(state): WhiteboardTool {
			return state.settings.currentTool;
		},
		backdropColor(state): string {
			return state.settings.backdropColor;
		},
	},
	mutations: {
		updateTool(state, tool: WhiteboardTool): void {
			state.settings.currentTool = tool;
		},
		updateColor(state, color: string): void {
			state.settings.color = color;
		},
		updateBackdropColor(state, color: string): void {
			state.settings.backdropColor = color;
		},
	},
	actions: {
		updateTool(context, tool: WhiteboardTool): void {
			context.commit('updateTool', tool);
		},
		updateColor(context, color: string): void {
			context.commit('updateColor', color);
		},
		updateBackdropColor(context, color: string): void {
			context.commit('updateBackdropColor', color);
		},
	},
	modules: {},
});
