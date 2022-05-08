<template>
	
	<el-menu


	mode="horizontal"

	background-color="#545c64"
	text-color="#fff"
	active-text-color="#ffd04b">
	<el-menu-item style="margin-left:10px" index="1">
		<el-image style="width:45px;margin-top:8px;margin-right:10px" src="/logo.png" >
			 
		</el-image>
		PHẦN MỀM TỰ ĐỘNG ĐĂNG BÀI
	</el-menu-item>


	<el-menu-item style="float:right">
		<el-dropdown placement="bottom-end" size="small" trigger="click" :split-button="false" :hide-on-click="false">
			<span >

				<i  style="color:white" class="el-icon-s-tools"></i>

			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item  :disabled="false">
					<el-link icon="el-icon-user" type="success" :underline="false" @click="turnOn_Profile" :disabled="false">Profile</el-link>
				</el-dropdown-item>

				<el-dropdown-item :divided="true"  :disabled="false">
					<el-link icon="el-icon-key" type="primary" :underline="false" @click="turnOn_dialog" :disabled="false">Thay đổi mật khẩu</el-link>
				</el-dropdown-item>


				<el-dropdown-item :divided="true" :disabled="false">
					<el-link icon="el-icon-switch-button" @click="logout" type="warning" :underline="false" :disabled="false">Đăng xuất</el-link>
				</el-dropdown-item>

			</el-dropdown-menu>
		</el-dropdown>
	</el-menu-item>

	<DialogChangePassword/>
	<el-dialog title="Profile" :visible.sync="Profile_Dialog" :center="false" :fullscreen="false" top="20vh" width="600px">
	     <el-form status-icon label-width="120px" label-position="left" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="medium">
	     
	         <el-form-item class="field" label="Point" prop="" align="left">
	             <el-tag  type="primary" :closable="false" effect="plain" size="large" :disable-transitions="false">{{user.point}}</el-tag>
	         </el-form-item>

	         <el-form-item class="field" label="Phone" prop="" align="left">
	             <el-input v-model="user.phone" size="medium" clearable type="text" :autosize="false" :disabled="user.phone === 'admin'" autocomplete="off"></el-input>
	         </el-form-item>

	         <el-form-item class="field" label="Email" prop="" align="left">
	             <el-input v-model="user.email" size="medium" clearable type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
	         </el-form-item>
	     
	         <el-form-item class="field" align="left">
	             <el-button type="primary" @click="UpdateInfo" icon="" :loading="loading_update" :plain="false" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">Update</el-button>
	         </el-form-item>
	         
	     </el-form>
	</el-dialog>
</el-menu>

</template>
<script>
	import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
	import DialogChangePassword from '~/components/dashboard/change-password';

	export default {
		
		components:{DialogChangePassword},
		data(){
			return {
				admin:false,
				Profile_Dialog:false,
				user:{id:null,phone:'',email:'',point:0},
				loading_update:false
			}
		},
		created:async function(){
			return await this.GetInfo();
		},
		
		methods:{
			...mapMutations('change-password',['turnOn_dialog']),
			turnOn_Profile:async function(){
				await this.GetInfo();
				return this.Profile_Dialog = true;
			},
			GetInfo:async function(){
				let {data} = await this.$axios.get('/api/account/info');
				return this.user = data;
			},
			UpdateInfo:async function(){
				this.loading_update = true
				await this.$axios.post('/api/account/update-info',{account_id:this.user.id,phone:this.user.phone,email:this.user.email});
				await this.GetInfo();
				this.$notify({
				    title: 'Thành công',
				    message: 'Đã cập nhật thông tin tài khoản',
				    type: 'success'
				});
				this.loading_update = false;
				return;
			},
			async logout(){
				await this.$auth.logout()
			}
			
		}
	}
</script>
<style scoped>

</style>