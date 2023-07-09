<template>
	<div class="color-picker">
		<div class="color-boxes">
			<div class="color-box-row">
				<ColorBox
					v-for="(color, index) in colors"
					:key="`${color}-${index}`"
					:color="color"
					@selectColor="updateColor(color)"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import ColorBox from './ColorBox.vue';

export default Vue.extend({
	name: 'ColorPicker',
	components: {
		ColorBox,
	},
	data() {
		return {
			colors: ['red', 'blue', 'green'],
		};
	},
	methods: {
		...mapActions(['updateColor']),
	},
	computed: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.color-boxes {
	display: flex;
}

.color-box-row {
	display: flex;
	gap: 1rem;
}
</style>
