<template>
	
	
	<el-menu :router="true" :default-active="$route.path" menu-trigger="click" :collapse="false" mode="vertical" >
	  <el-menu-item :index="'/dashboard'">
	  	 <i class="el-icon-search"></i>
	  	 <span>Tổng hợp</span>
	  </el-menu-item>
	  <el-menu-item :index="'/dashboard/reup'">
	  	 <i class="el-icon-s-promotion"></i>
	  	 <span>Reup Page</span>
	  </el-menu-item>
	  <el-submenu :index="'/dashboard/ban-be'">

			<template  slot="title"><i class="el-icon-user-solid"></i> Bạn bè</template>
			<el-menu-item :index="'/dashboard/ban-be/gui-tin-nhan'">Gửi tin nhắn</el-menu-item>
			<el-menu-item :index="'/dashboard/ban-be/ket-ban'">Kết bạn</el-menu-item>
			
			
		</el-submenu>
	  <el-menu-item :index="'/dashboard/phone-uid'">
	  	 <i class="el-icon-phone-outline"></i>
	  	 <span>Phone & UID</span>
	  </el-menu-item>
	  <el-menu-item :index="'/dashboard/lien-ket'">
	  	 <i class="el-icon-link"></i>
	  	 <span>Liên kết</span>
	  </el-menu-item>

	  <el-menu-item v-if="user.phone === 'admin'" :index="'/dashboard/quan-ly-tai-khoan'">
	  	 <i class="el-icon-notebook-2"></i>
	  	 <span>Quản lý tài khoản</span>
	  </el-menu-item>
	  
	  
	</el-menu>
	
</template>
<script>
	export default {
		data(){
			return {
				user:{phone:''}
			}
		},
		created:async function(){
			return await this.GetInfo();
		},
		methods:{
			GetInfo:async function(){
				let {data} = await this.$axios.get('/api/account/info');
				return this.user = data;
			}
		}
	}
</script>
<style scoped>

</style>
