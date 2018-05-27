<template> 
	<div id="content" style="margin-top:5rem">
		<div class="title" style="border-bottom:2px solid #ccc;">订单详情</div>
		<div class="title" style="border-bottom:1px solid #ddd;"><small>收货信息</small><span style="font-size:0.5rem;color:#bbb">&nbsp;&nbsp;(如若需要重新选择请刷新页面)</span> <br>
			<div class="address">
				<el-row :gutter="12">
				  <el-col :span="8">
				    <el-card shadow="hover">
				      收货人：{{userlist.user_name}}<br>
					  联系方式：{{userlist.tel}}<br>
					  地址：{{userlist.address}}<br>
					  <el-button type="text" style="font-size:0.5rem;float:right;"  >默认地址</el-button> 
					</el-card>
				  </el-col>
				  <el-col :span="8" v-for="(additem,index) in addressdata" :key="index">
				    <el-card shadow="hover">
				      收货人：{{additem.username}}<br>
					  联系方式：{{additem.usertel}}<br>
					  地址：{{additem.useraddress}}<br>
					  <el-button type="text" style="font-size:0.5rem;float:right;color:#"  @click="changeaddress(index,addressdata)">收货地址{{index+1}}</el-button><i class="el-icon-arrow-right" v-show="true"></i> <i class="el-icon-success" v-show="additem.faultaddress" style="color:green;"></i>
					</el-card>
				  </el-col>
				  <el-col :span="8">
				    <el-card shadow="never" >
				      <center><i class="el-icon-plus" style="font-size:4.8rem;color:#ccc" @click="dialogFormVisible=true"></i></center>
				    </el-card>
				  </el-col>
				</el-row>				
			</div>
		</div>
		<el-table :data="shopping" stripe fit style="width: 96%;margin:0 2% 0 2%;" v-loading="isloading" max-height="500">
      		<el-table-column label="订单号" width="100" align="center">
      			<template slot-scope="scope">
	          		{{scope.row.order_id}} 
	        	</template>
      		</el-table-column>
      		<el-table-column label="商品名称" width="180" align="center">
      			<template slot-scope="scope">
	          		{{scope.row.good_name}} 
	        	</template>
      		</el-table-column>
      		<el-table-column label="图片" width="120" align="center">
      			<template slot-scope="scope">
	          	 <router-link :to="{ name:'Detail',params:{goodid:scope.row.goodid}}"> 
				  	<img :src="'http://localhost:8082/'+scope.row.good_photo" width="60" height="60" style="border:0.1rem solid #aaa;"/> 
				 </router-link>  
	        	</template>
      		</el-table-column>
      		<el-table-column label="单价" width="150" align="center">
      			<template slot-scope="scope">
	          		{{scope.row.goodprice}} 
	        	</template>
      		</el-table-column>
      		<el-table-column label="数量" width="100" align="center">
      			<template slot-scope="scope">
      				{{scope.row.goodnum}}
	        	</template>
      		</el-table-column>
      		<el-table-column label="总价" width="100" align="center">
      			<template slot-scope="scope">
      				{{scope.row.total}}
	        	</template>
      		</el-table-column>
      		<el-table-column label="状态" width="100" align="center">
      			<template slot-scope="scope">
      				{{scope.row.status}}
	        	</template>
      		</el-table-column>
      		<el-table-column label="操作" align="center">
      			<template slot-scope="scope">
      				<el-button icon="el-icon-delete" circle @click="handleClick(scope.$index, shopping)"></el-button>
	        	</template>
      		</el-table-column>
		</el-table>
		<div class="pay">
			<div class="pay_info">
			<router-link to="shoppingcar"><small><<返回购物车</small></router-link><br>
			金额:<span style="margin:0 1rem;">{{total}}</span>元<br>
				<el-button @click="order('cancel')">取消</el-button> 
				<el-button type="danger" @click="order('success')">付款</el-button> 
			</div>
		</div>

		<!--添加收货地址-->
		<el-dialog title="添加收货地址" :visible.sync="dialogFormVisible" width="40%">
		  <el-form :model="form">
		    <el-form-item label="姓名">
		      <el-input v-model="form.name" auto-complete="off"></el-input>
		    </el-form-item>
			<el-form-item label="联系方式">
		      <el-input v-model="form.tel" auto-complete="off" type="number"></el-input>
		    </el-form-item>
		    <el-form-item label="地址">
		      <el-input v-model="form.address" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="Addaddress">确 定</el-button>
		  </div>
		</el-dialog>
		<!--付款状态-->
		<el-dialog :visible.sync="dialogVisible" width="30%">
		  <span class="paysuccess"><el-button type="success" icon="el-icon-check" circle plain></el-button><br><br>付款成功</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <router-link to="/Orderlist"><el-button type="primary">确 定</el-button></router-link>
		  </span>
		</el-dialog>
		<el-dialog :visible.sync="dialogfailVisible" width="30%">
		  <span class="paysuccess"><el-button type="danger" icon="el-icon-close" circle plain></el-button><br><br>放弃付款</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogfailVisible = false">取 消</el-button>
		    <router-link to="/Orderlist"><el-button type="primary">确 定</el-button></router-link>
		  </span>
		</el-dialog>
	</div>
</template>

<script> 
import { setCookie,getCookie,delCookie } from '../assets/js/cookie.js'
export default{ 
 	data(){  
      return{ 
      	isloading:true,
      	username:'',
      	orderid:'',
      	userid:'',//当前用户id
      	userlist:null,//当前用户信息
      	shopping:[],//订单展示
      	shoppinglist:null,
      	total:0,
      	dialogVisible:false,
      	dialogfailVisible:false,
      	dialogFormVisible:false,
      	addressdata:null,
      	choseaddress:null,
      	form:{
      		name:'',tel:'',address:''
      	},
      	
      } 
  	},
  	created(){
  		this.orderid=this.$route.params.orderid
  		this.checkorder(this.orderid)
  	},
  	mounted(){
    	if(getCookie('username')){
	       	this.username=getCookie('username')
	       	this.finduserid(this.username)
	    }
	    else{
	    	this.$router.push("/login")
	    }
    },
  	methods:{
		//找到当前用户信息
		finduserid(username){
			var self = this; //很关键
			self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/find_user',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	user_name:username
			   },
			   timeout: 3000
			}).then(function(res){
				self.userlist=res.data[0]//用户信息
				self.userid=self.userlist.id
				self.address(self.userid)//
			}).catch(function(err){
				console.log(err);
			});
		},
		//显示订单
		checkorder(orderid){
			var self = this; //很关键
			self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/check-order',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	order_id:orderid
			   },
			   timeout: 3000
			}).then(function(res){
				self.shopping=res.data
				for(var i=0;i<self.shopping.length;i++){
					self.goodData(self.shopping[i],self.shopping[i].goodid)
				}	
			}).catch(function(err){
				console.log(err);
			});
			self.isloading=false
		},
		//查找相关的商品信息
		goodData(shopping,goodid){
			var self = this; //很关键
			self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/good-details',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{id:goodid},
			   timeout: 3000
            }).then(function(res) {
               if(res.data == -1){
                  console.log(res)
              }else{              	
              	self.shoppinglist=res.data
          		shopping.good_photo=self.shoppinglist[0].good_photo.split(",")[0]
          		shopping.good_name=self.shoppinglist[0].good_name
              	console.log("shopping",shopping)
              	self.total=self.total+shopping.total
              }
            }).catch(function(error) {
                console.log(error);
            });
		},
		//显示收货地址
		address(userid){
			var self=this
      		self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/user-address',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{userid:userid},
			   timeout: 3000
			}).then(function(res){
				self.addressdata=res.data
			}).catch(function(err){
				console.log(err);
			});
		},
		order(type){
			if(this.choseaddress==''){
				if(type=="cancel"){
					this.Orderstatus(this.orderid,"待付款")
				}
				else if(type=="success"){
					this.Orderstatus(this.orderid,"已付款")
				}
			}else{//如果选择其他收货地址，需要更新订单信息
				if(type=="cancel"){
					this.Orderaddress(this.orderid,"待付款")
				}
				else if(type=="success"){
					this.Orderaddress(this.orderid,"已付款")
				}
			}	
		},
		Orderstatus(orderid,status){
      		var self=this;
      		self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/status-order',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	status:status,
			   	order_id:orderid
			   },
			   timeout: 3000
			}).then(function(res){		
				console.log(res.data)
				if(status=="待付款"){
					self.dialogfailVisible=true
				}else{
					self.dialogVisible=true
				}			
			}).catch(function(err){
				console.log(err);
			});
      	},
      	//更改收货地址提交
      	Orderaddress(orderid,status){
      		var self=this;
      		console.log(self.choseaddress)
      		self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/address-order',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	order_personname:self.choseaddress.username,
			   	order_address:self.choseaddress.useraddress,
			   	order_tel:self.choseaddress.usertel,
			   	order_mail:self.userlist.mail,
			   	order_sex:self.userlist.sex,
			   	status:status,
			   	order_id:orderid
			   },
			   timeout: 3000
			}).then(function(res){
				console.log(res.data)
				if(status=="待付款"){
					self.dialogfailVisible=true
				}else{
					self.dialogVisible=true
				}	
			}).catch(function(err){
				console.log(err);
			});
      	},
      	//添加地址
      	Addaddress(){
      		var self=this
      		self.dialogFormVisible = false
      		if(self.form.name==''||self.form.tel==''||self.form.address==''){
      			self.$message({
		          message: '请完善信息',
		          type: 'warning'
		        });
      		}
      		else{
      		self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/add-address',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	userid:self.userid,
			   	username:self.form.name,
			   	usertel:self.form.tel,
			   	useraddress:self.form.address
			   },
			   timeout: 3000
			}).then(function(res){
				self.$message({
		          message: '添加成功',
		          type: 'success'
		        });
			}).catch(function(err){
				console.log(err);
			});
			self.address(self.userid)
			}
      	},
      	//修改下单地址
      	changeaddress(index,row){
      		this.$message({
	          message: '选为此次收货地址',
	          type: 'success'
	        });
	        for(var i=0;i<row.length;i++){
	        	row[i].faultaddress=0
	        }
	        this.addressdata[index].faultaddress=1
	        this.choseaddress=row[index]//选中的地址信息
      	}
	}
}
</script>

<style>
.title{width:96%;padding:1rem 2% 1rem 2%;font-size:1.5rem;}
.title .address{font-size:0.9rem;line-height:1.2rem;padding:0.5rem 1rem 0.5rem 1rem;margin:1rem 0;width:95%;border-radius:0.2rem;color:#555;cursor:pointer;}
.el-col{margin:0.5rem 0;}
.pay{width:100%;
	height:8rem;font-size:1.2rem;line-height:1.8rem;
	background:#fff;
}
.el-dialog label{width:20%;}
.el-dialog .el-input{width:70%;}
.pay_info small{font-size:0.8rem;color:#bbb;cursor:pointer;}
.pay_info small:hover{color:#1b1b1b;}
.pay_info{float:right;margin-right:2rem;}
.pay_info .el-button{margin-top:1rem;margin-right:1rem;} 
.paysuccess{width:100%;text-align:center;display:block;}
.paysuccess .el-button{font-size:2rem;}
</style>