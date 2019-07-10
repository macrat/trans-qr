<style scoped>
.simple-card {
    margin: 8px;
    width: 250px;
    height: 500px;

    display: flex;
    flex-direction: column;
    padding: 16px 10px;
    box-sizing: border-box;

	border: 1px solid #ccc;
	background-color: white;
	border-radius: 6px;
}
</style>

<template>
	<div class=simple-card :style=style>
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		'center': [Boolean],
		'horizontal': [Boolean],
	},
	computed: {
		style() {
			return {
				'align-items': this.center ? 'center' : 'auto',
				'justify-content': this.center ? 'center' : 'auto',
				'flex-direction': this.horizontal ? 'row' : 'column',
			};
		},
	},
}
</script>
