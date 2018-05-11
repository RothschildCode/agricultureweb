<template>
	<div class="more-operation">
		<a class="more-operation-btn" @click="openPopover($event)"></a>
	</div>	
</template>

<script type="text/javascript">
	import {eventbus, EVENTS} from '../js/bus'
	export default {
		props: ['data'],
		methods: {
			openPopover(e) {
				eventbus.$emit(EVENTS.MORE_OPERATION_TAP, {e, data: this.data})
			}
		}
	}
</script>