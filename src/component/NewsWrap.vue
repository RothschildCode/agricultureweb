<template>
	<div>
		<div v-if="data.channel" class="list-block">
			<ul>
				<li class="item-content">
					<div class="item-media">
						<i class="icon icon-f7">
							<img :src="data.channel.icon">
						</i>
					</div>
					<div class="item-inner">
						<div>
							<div class="item-title" v-html="data.channel.cname"></div>
							<div class="item-subtitle" v-html="data.channel.description"></div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<news v-for="(item, $index) in data.list" :data="item" :key="$index"></news>
<!-- 		<div v-if="data.list.length < 1" class="none-wrap">
			<div v-if="loaded" class="label">无数据</div>
			<div v-if="!loaded" class="label">
				<div class="logo-gif"></div>
			</div>
		</div>	 -->	
	</div>
</template>

<script type="text/javascript">
	import News from './News'
	export default {
		props: ['data', 'loaded'],
		components: {
			News
		}
	}
</script>