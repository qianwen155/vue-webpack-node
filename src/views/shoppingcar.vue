<template> 
	<div id="content" style="margin-top:5rem">
		<div class="title">购物车列表</div>
		<el-table :data="shopping" stripe fit style="width: 96%;margin:0 2% 0 2%;" v-loading="isloading" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="120" align="center">      			
      		</el-table-column>	
      		<el-table-column label="id" width="100" align="center">
      			<template slot-scope="scope">
	          		{{scope.row.id}} 
	        	</template>
      		</el-table-column>
      		<el-table-column label="名称" width="180" align="center">
      			<template slot-scope="scope">
	          		{{scope.row.good_name}} 
	        	</template>
      		</el-table-column>
      		<el-table-column label="图片" width="180" align="center">
      			<template slot-scope="scope">
	          	 <router-link :to="{ name:'Detail',params:{goodid:scope.row.id}}"> 
				  	<img :src="'http://localhost:8082/'+scope.row.good_photo" width="60" height="60" style="border:0.1rem solid #aaa;"/> 
				 </router-link>  
	        	</template>
      		</el-table-column>
      		<el-table-column label="单价" width="150" align="center">
      			<template slot-scope="scope">
	          		{{scope.row.good_price}} 
	        	</template>
      		</el-table-column>
      		<el-table-column label="数量" width="100" align="center">
      			<template slot-scope="scope">
      			<i class="el-icon-remove" @click="rem_num(scope.$index, shopping)"></i>
      				&nbsp;&nbsp;{{scope.row.shopnum}}&nbsp;&nbsp;
      			<i class="el-icon-circle-plus" @click="plus_num(scope.$index, shopping)"></i>
	        	</template>
      		</el-table-column>
      		<el-table-column label="操作" align="center">
      			<template slot-scope="scope">
      				<el-button icon="el-icon-delete" circle @click="handleClick(scope.$index, shopping)"></el-button>
	        	</template>
      		</el-table-column>
		</el-table>
		<hr style="color:#eee">
		<div class="pay">
			<div class="pay_info">
			<router-link to="/Orderlist"><small>查看我的订单>></small></router-link><br>
			金额:<span style="margin:0 1rem;">{{total}}</span>元<br>
				<el-button type="danger" plain :disabled="ispay" @click="payout">结算</el-button> 
			</div>
		</div>
	</div>
</template>

<script> 
import { setCookie,getCookie,delCookie } from '../assets/js/cookie.js'
export default{ 
 	data(){  
      return{ 
      	isloading:true,
      	username:'',
      	userid:'',//当前用户id
      	userlist:null,//当前用户信息
      	productList:[],//已有商品信息
      	productnum:[],//已有商品的数量
      	shoppinglist:null,
      	shoppingimage:null,
      	shopping:[],//购物车展示
      	shopnum:[],
      	max:[],//最多可以添加
      	num:1,
      	total:0,
      	ispay:true,
      	multipleSelection:[]
      } 
  	},
  	created(){ 
    },
  	mounted(){
    	if(getCookie('username')){
	       	this.username=getCookie('username')
	       	this.finduserid()
	    }
	    else{
	    	this.$router.push("/login")
	    }
    },
  	methods:{
		//找到当前用户信息
		finduserid(){
			var self = this; //很关键
			self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/find_user',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	user_name:self.username
			   },
			   timeout: 3000
			}).then(function(res){
				self.userlist=res.data[0]
				self.userid=self.userlist.id
				self.userCarlist(self.userid)
			}).catch(function(err){
				console.log(err);
			});
		},
		//循环输出商品信息
		fetchshopdata(goodid,num){
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
              	self.shoppinglist[0].good_photo=self.shoppinglist[0].good_photo.split(",")[0]
              	self.shoppinglist[0].shopnum=num
              	self.shopping.push(self.shoppinglist[0])
              	console.log(self.shopping)
              }
             }).catch(function(error) {
                console.log(error);
             });
             self.isloading=false
		},
		//增加减少商品数量
		rem_num(index, rows){
			var min=rows[index].shopnum
			if(min<=1){
				min=1
			}
			else{
				min--
				rows[index].shopnum--
				this.change_goodnum(min,rows[index].id)
			}			 
		},
		plus_num(index, rows){
			var max=rows[index].shopnum
			if(max>=rows[index].good_num){
				max=rows[index].good_num
			}
			else{
				max++
				rows[index].shopnum++
				this.change_goodnum(max,rows[index].id)
			}	
		},
		//商品数量更改请求
		change_goodnum(goodnum,goodid){
			this.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/add_shopingcar',
			   data:{
			   	goodnum:goodnum,
			   	goodid:goodid,		   
			   	userid:this.userid
			   },
			   timeout: 3000
			}).then(function(res){
				console.log(res)
			}).catch(function(err){
				console.log(err);
			});
		},
		//选择商品列表结算
		handleSelectionChange(val) {
			this.total=0
        	this.multipleSelection = val;
        	if(this.multipleSelection!=""){
        		this.ispay=false
        		for(var i=0;i<this.multipleSelection.length;i++){
        			this.total=this.total+this.multipleSelection[i].good_price*this.multipleSelection[i].shopnum
        		}	
        	}
        	else{
        		this.ispay=true
        		this.total=0
        	}
      	},
      	//删除购物车
      	handleClick(index, rows) {
	        var self=this
      		self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/del-shoppingcar',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	userid:self.userid,
			   	goodid:rows[index].id
			   },
			   timeout: 3000
			}).then(function(res){
				console.log(res.data)
				rows.splice(index,1)
			}).catch(function(err){
				console.log(err);
			});
	        self.$message({
	          message: '删除成功',
	          type: 'success'
	        });
	    },
      	//当前用户的购物车列表
      	userCarlist(id){
      		var self=this
      		self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/show-shoppingcar',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	userid:id
			   },
			   timeout: 3000
			}).then(function(res){
				self.userlist=res.data
				for(var i=0;i<self.userlist.length;i++){
					self.fetchshopdata(self.userlist[i].goodid,self.userlist[i].goodnum)
				}
			}).catch(function(err){
				console.log(err);
			});
			self.isloading=false
      	},
      	//结算
      	payout(){
      		for(var i=0;i<this.multipleSelection.length;i++){	
      			this.CheckOrder(this.multipleSelection[i].id,this.multipleSelection[i].shopnum,this.multipleSelection[i].good_price)
      		}
      	},
      	//循环插入
      	CheckOrder(goodid,num,price){
      		var self=this
      		var orderid=Date.now()+"-"+self.userid
      		var time=new Date()
      		var userid,address,sex,tel,email
      		self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/find_user',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	user_name:self.username
			   },
			   timeout: 3000
			}).then(function(res){
				self.userlist=res.data[0]
				userid=self.userlist.id
				address=self.userlist.address
				sex=self.userlist.sex
				tel=self.userlist.tel
				email=self.userlist.email
				self.addOrder(orderid,goodid,num,price,userid,address,sex,tel,email,time)
			}).catch(function(err){
				console.log(err);
			}); 		
      	},
      	addOrder(orderid,goodid,num,price,userid,address,sex,tel,email,time){
      		var self=this;
      		self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/add-order',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	order_id:orderid,
			   	goodid:goodid,
			   	goodnum:num,
			   	goodprice:price,
			   	order_person:userid,
			   	order_personname:self.username,
			   	order_address:address,
			   	order_sex:sex,
			   	order_tel:tel,
			   	order_email:email,
			   	order_time:time,
			   	total:num*price,
			   	status:'待付款'
			   },
			   timeout: 3000
			}).then(function(res){
				console.log(res.data)
				self.$router.push({ name:'Payout',params:{orderid:orderid}})
			}).catch(function(err){
				console.log(err);
			});
      		self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/del-shoppingcar',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	userid:self.userid,
			   	goodid:goodid
			   },
			   timeout: 3000
			}).then(function(res){
				console.log(res.data)
				//shopping.splice(index,1)
			}).catch(function(err){
				console.log(err);
			});
      	}
	}
}
</script>

<style> 
.title{padding:1rem;font-size:1.5rem;}
.pay{width:100%;
	height:8rem;font-size:1.2rem;line-height:1.8rem;
	background:#fff;
}
.pay_info small{font-size:0.8rem;color:#bbb;cursor:pointer;}
.pay_info small:hover{color:#1b1b1b;}
.pay_info{float:right;margin-right:2rem;}
.pay_info .el-button{margin-top:1rem;margin-right:1rem;}
</style>