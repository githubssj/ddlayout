<template>
	<div class="error-page content-inner">
		<div class="error-code">4<span>0</span>4</div>
		<div class="error-desc">啊哦~ 你所访问的页面不存在</div>
		<div class="error-handle">
			<router-link to="/">
				<Button class="error-btn" type="primary">返回首页</Button>
			</router-link>

			<Button class="error-btn" type="primary" @click="goBack">返回上一页</Button>

			<router-link to="/login">
				<Button class="error-btn" type="primary">转到登录</Button>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			goBack() {
				this.$router.go(-1);
			}
		}
	}
</script>


<style scoped>
	.error-page {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: #f3f3f3;
		box-sizing: border-box;
	}

	.error-code {
		line-height: 1;
		font-size: 250px;
		font-weight: bolder;
		color: #2d8cf0;
	}

	.error-code span {
		color: #00a854;
	}

	.error-desc {
		font-size: 30px;
		color: #777;
	}

	.error-handle {
		margin-top: 30px;
		padding-bottom: 200px;
	}

	.error-btn {
		margin-left: 50px;
	}
</style>
