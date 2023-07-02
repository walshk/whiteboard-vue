<template>
	<div class="home">
		<BaseWhiteboard />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseWhiteboard from '@/components/canvas/BaseWhiteboard.vue';

export default Vue.extend({
	name: 'HomeView',
	components: {
		BaseWhiteboard,
	},
});
</script>
