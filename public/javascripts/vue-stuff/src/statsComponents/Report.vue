<template>
	<div :class="cssClass">
		<span class='reportTitle'>{{ title }}</span>
		<span class='reportValue'>{{ value }}</span>
	</div>
</template>


<script>

export default{
	data(){
		return{
		}
	},
	props: [
		'cssClass',
		'title',
		'value'
	]
}

	
</script>



