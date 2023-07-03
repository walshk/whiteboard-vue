<template>
	<div class="home">
		<ToolSelector />
		<BaseWhiteboard />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseWhiteboard from '@/components/canvas/BaseWhiteboard.vue';
import ToolSelector from '@/components/tools/ToolSelector.vue';

export default Vue.extend({
	name: 'HomeView',
	components: {
		BaseWhiteboard,
		ToolSelector,
	},
});
</script>

<style>
.home {
	width: 100%;
	height: 100%;
}
</style>
