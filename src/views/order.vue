<template> 
	<div id="content" style="margin-top:5rem">
		 <div class="title">订单列表</div>
		 <el-table :data="shopping" stripe fit style="width: 96%;margin:0 2% 0 2%;" v-loading="isloading">
		 	    <el-table-column type="expand">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="订单号">
			            <span>{{ props.row.order_id }}</span>
			          </el-form-item>
			          <el-form-item label="商品名称">
			            <span>{{ props.row.good_name }}</span>
			          </el-form-item>
			          <el-form-item label="用户姓名">
			            <span>{{ props.row.order_personname}}</span>
			          </el-form-item>
			          <el-form-item label="性别">
			            <span>{{ props.row.order_sex}}</span>
			          </el-form-item>
			          <el-form-item label="联系方式">
			            <span>{{ props.row.order_tel }}</span>
			          </el-form-item>
			           <el-form-item label="邮箱地址">
			            <span>{{ props.row.order_email }}</span>
			          </el-form-item>
			          <el-form-item label="收货地址">
			            <span>{{ props.row.order_address }}</span>
			          </el-form-item>
			          <el-form-item label="下单时间">
			            <span>{{ props.row.order_time }}</span>
			          </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
      		<el-table-column label="订单号" width="150" align="center">
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
      		<el-table-column label="操作" align="center" fixed="right">
      			<template slot-scope="scope">
      				<el-button icon="el-icon-delete" type="danger" circle @click="handledel(scope.$index, shopping)"></el-button>
	        	</template>
      		</el-table-column>
		</el-table>
		<div class="pay">
			<div class="pay_info">
			<router-link to="shoppingcar"><small><<返回购物车</small></router-link>
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
      	shopping:[],//订单展示
      	shoppinglist:null,
      	total:0,
      } 
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
				self.userlist=res.data[0]
				self.userid=self.userlist.id
				self.checkorder(self.userid)
			}).catch(function(err){
				console.log(err);
			});
		},
		//查找订单
		checkorder(userid){
			var self = this; //很关键
			self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/check-userorder',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	order_person:userid
			   },
			   timeout: 3000
			}).then(function(res){
				console.log(res.data)
				self.shopping=res.data
				for(var i=0;i<self.shopping.length;i++){
					self.goodData(self.shopping[i],self.shopping[i].goodid)
					var time=new Date(Date.parse(self.shopping[i].order_time)+3600*1000*8)
					self.shopping[i].order_time=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()
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
              }
            }).catch(function(error) {
                console.log(error);
            });
		},
		//删除订单
		handledel(index,rows){
			var self = this; //很关键			
			self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/del-order',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{order_id:rows[index].order_id},
			   timeout: 3000
            }).then(function(res) {             	       		
              	rows.splice(index,1)
              	self.$message({
		          message: '删除成功',
		          type: 'success'
		        });
            }).catch(function(error) {
                console.log(error);
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
.demo-table-expand .el-form-item{width:45%;height:30px;}
.demo-table-expand .el-form-item label{color:#aaa;width:100px;}
</style>