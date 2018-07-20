<template>
	<div class="more-operation">
		<a class="more-operation-btn f7-icons fontsize-2x" @click="openPopover($event)">more</a>
	</div>	
</template>

<script type="text/javascript">
	import {v, EVENTS} from '../core/vbus'
	export default {
		props: ['data'],
		methods: {
			openPopover(e) {
				v.$emit(EVENTS.MORE_OPERATION_TAP, {e, data: this.data})
			}
		}
	}
</script>