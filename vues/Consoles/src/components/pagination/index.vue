<!-- 分页器 -->
<template>
	<el-pagination
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="currentPages?currentPages:pageInfo.currentPage"
		:page-sizes="pageInfo.pageSizes"
		:page-size="pageInfo.pageSize"
		:layout="pageInfo.layout"
		:total="pageInfo.total"
		style="text-align: center">
	</el-pagination>
</template>
<script>
export default {
	name: "pagination",
	props: ['total','customconfig','currentPages'],
	data() {
		var vm = this;
		let pageInfo = this.initPagination();
		if(!!this.total){
			pageInfo.total = this.total;
		}
		//分页器可添加自定义的配置，在引用的时候，需要传递参数，如果有参数，就合并
		if(!!this.customconfig){
			pageInfo = Object.assign(pageInfo,this.customconfig)
		}
		return {
			pageInfo: pageInfo
		}
	},
	methods: {
		handleSizeChange: function(size) {
			this.pageInfo.pageSize = size;
			this.$emit('pageChanged', this.pageInfo.currentPage, this.pageInfo.pageSize);

		},
		handleCurrentChange: function(currentPage) {
			this.pageInfo.currentPage = currentPage;
			this.$emit('pageChanged', this.pageInfo.currentPage, this.pageInfo.pageSize);
		}
	},
	watch: {
		total: function() {
			this.pageInfo.total = this.total;
		}
	}
}

</script>
