<template>
	<div class="tool-selector">
		<span
			@click="updateTool(WhiteboardTool.Draw)"
			:style="selectedToolStyle('draw')"
			class="tool-icon"
			><b-icon-pencil-fill
		/></span>
		<span
			@click="updateTool(WhiteboardTool.Erase)"
			:style="selectedToolStyle('erase')"
			class="tool-icon"
			><b-icon-eraser-fill
		/></span>
		<span id="paint-icon" class="tool-icon"><b-icon-paint-bucket /></span>
		<b-popover
			class="color-picker-popover"
			target="paint-icon"
			triggers="hover"
			placement="up"
			title="Select Color"
		>
			<ColorPicker />
		</b-popover>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { WhiteboardTool } from '@/enums/whiteboardTool';
import { StyleValue } from 'vue/types/jsx';

import ColorPicker from '@/components/tools/ColorPicker.vue';

type ToolMap = {
	[key: string]: WhiteboardTool;
};

export default Vue.extend({
	name: 'ToolSelector',
	components: {
		ColorPicker,
	},
	data() {
		return {
			WhiteboardTool: WhiteboardTool,
			tools: {
				draw: WhiteboardTool.Draw,
				erase: WhiteboardTool.Erase,
			} as ToolMap,
		};
	},
	methods: {
		...mapActions(['updateTool']),
		selectedToolStyle(toolName: string): StyleValue {
			const tool: WhiteboardTool = this.tools[toolName];

			const isSelected = tool === this.currentTool;
			const color = isSelected ? this.backdropColor : 'black';
			const hoverColor = isSelected ? this.backdropColor : 'darkgrey';

			return {
				'--tool-color': color,
				'--tool-color-hover': hoverColor,
			};
		},
	},
	computed: {
		...mapGetters(['currentTool', 'backdropColor']),
	},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tool-selector {
	position: absolute;

	margin: 0 auto;
	right: 0;
	left: 0;
	bottom: 50px;
	width: fit-content;

	background-color: white;
	border: 1px solid black;
	border-radius: 1rem;
	z-index: 1;
}

.tool-icon {
	font-size: 2rem;
	padding: 1rem;
	color: var(--tool-color);
}

.tool-icon:hover {
	color: var(--tool-color-hover);
	cursor: pointer;
}
</style>
