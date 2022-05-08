<template>
	<el-row :gutter="20">
		
		<el-col align="center" :span="12" :offset="6">
			<div v-if="address.length > 0">
				<el-tag type="primary" :closable="false" effect="plain" size="large" :disable-transitions="false">
					Your wallet: {{address}}
				</el-tag>
				<br>
				<br>
				<el-input-number v-model="number_of_box" size="mini" controls-position="right" :step="1" :min="1" :max="100000000000"></el-input-number>
				<el-tag  type="info" :closable="false" effect="plain" size="large" :disable-transitions="false">Fee: {{fee}} BUSD</el-tag>
				<br><br>
				<el-button type="primary" @click="purchase" icon="" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">Purchase</el-button>
			</div>

			<vue-metamask  ref="metamask" :initConnect="false" @onComplete="onComplete"/>


			<el-button type="primary" v-if="address.length === 0"  ref="siteInput" @click="connect" icon="" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">
				Connect Wallet
			</el-button>
		</el-col>
	</el-row>
</template>
<script>
	import VueMetamask from 'vue-metamask';
	export default {
		components: {
			VueMetamask,
		},
		data(){
			return{
				address:'',
				number_of_box:0

			}
		},
		computed:{
			fee(){
				return this.number_of_box * 200;
			}
		},
		mounted:async function(){
			this.connect();
		},
		methods:{
			onComplete:async function(data){
				this.address = data.metaMaskAddress;

			},
			connect() {
				this.$refs.metamask.init();
			},
			purchase:async function(){
				const transactionParameters = {
					nonce: '0x00', 
					gasPrice: '0x09184e72a000', 
					gas: '0x2710', 
					to: '0x0000000000000000000000000000000000000000', 
					from: this.address, 
					value: '0x29a2241af62c0000', 
					data:
					'0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
					chainId: '0x3',
				};
				const txHash = await window.ethereum.request({
					method: 'eth_sendTransaction',
					params: [transactionParameters],
				});
			}
		}
	}
</script>
