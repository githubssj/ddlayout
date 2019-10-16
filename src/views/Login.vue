<template>
	<div class="nsneo-login">
		<div class="nsneo-login-card-div">
			<Card class="nsneo-login-card">
				<p slot="title">{{sysTitle}}</p>
			
				<div class="nsneo-login-row">
					<Input ref="loginname" prefix="ios-contact" placeholder="用户名" style="width:100%" v-model="loginName"  @keydown.enter.native="toPwdInput"/>
				</div>
			
				<div class="nsneo-login-row">
					<Input ref="pwd" prefix="ios-cube" placeholder="密码" type="password" style="width: 100%" v-model="loginPwd" @keydown.enter.native="login"/>
				</div>
				<div class="nsneo-login-row">
					<Button ref="loginbtn" type="primary" @click="login()">登录</Button>
				</div>
			
			</Card>
		</div>
		
	</div>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters,
		mapActions
	} from "vuex";

	export default {

		name: "",
		components: {},
		methods: {
			login() {
				//console.log('登录操作...')
				this.$router.replace("/");
			},
			toPwdInput(){
				//console.log('跳转到密码输入...')
				this.$nextTick(()=>{
					this.$refs.pwd.focus()
				})
			}
		},
		data: function() {
			return {
				loginName: '',
				loginPwd: '',
			}
		},

		computed: {
			...mapGetters(["showheader", "showleftmenu", "loginUser", "sysTitle"])
		},
	}
</script>
<style scoped>
	.nsneo-login {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: url(../assets/imgs/login_bg_w.jpg);
		background-size: 100%;
		margin: 0px;
		padding: 0px;
	}
	
	.nsneo-login-card-div{
		
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -175px;
			margin-top: -200px;
	}

	.nsneo-login-card {
		width: 350px;
		background: rgba(255, 255, 255, 0.5) !important;

	}

	.nsneo-login-row {
		margin-bottom: 10px;
		text-align: center;
	}
	
	.nsneo-login-row .ivu-input-group-prepend{
		width: 60px !important;
		text-align: left;
	}
	.nsneo-login-row button{
		width: 100%;
	}
</style>
