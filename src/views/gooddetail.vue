<template>
<div id="content">
	<!--头部展示图-->
	<div class="top_show">
		<img :src="'http://localhost:8082/'+imagetop">
		<div class="top_info"> 
			<h2>{{list.good_name}}</h2>
			<h3>￥{{list.good_price}}</h3>
			<div class="handle">
				<small>现在下单，大约两个工作日会发货，如有变动会提前通知。<br>默认是顺丰快递，如果需要其他快递公司请提前备注。</small>
			</div>
			<div class="handle">
			<i class="el-icon-remove" @click="rem_num"></i>
			<input v-model="num" type="number" min="1" :max="list.good_num"></input>
			<i class="el-icon-circle-plus" @click="plus_num"></i>
			</div>
			<button @click="finduserid">加入购物车</button>
			<button @click="payNow">立刻购买</button>
		</div>
	</div>

	<!--详情图片-->
	<div class="imglist">
		<img src="../assets/img/describe.jpg">
	</div>
	<div class="imglist" v-for="image in imagelist" v-loading="isloading">
		<img :src="'http://localhost:8082/'+image">
	</div>

	<!--右侧栏购物车-->
	<div class="righticon"> 
		<router-link to="/shoppingcar">
			<el-badge :value="notice" class="item"><i class="iconfont">&#xe60c;</i></el-badge>  
		</router-link>
		<br>
		<i class="iconfont" @click="pageScroll">&#xe6a5;</i>
		
	</div>

</div>
</template>

<script>
import Vuex from "vuex";    
import { setCookie,getCookie,delCookie } from '../assets/js/cookie.js'
export default{  
    data(){  
      return{ 
      	isloading:true,
      	username:'',//当前用户名
      	userid:0,//当前用户id
      	userlist:null,//当前用户信息
      	unlogin:1,
      	goodid:'',
      	list:null,
      	imagelist:null,
      	imagetop:null,
      	num:1,
      	shoppinglist:null,
      	shoppingimage:null,
      	shopnum:1,
      	notice:0,
      }  
    },  
    created(){ 
    	this.goodid=this.$route.params.goodid
    	this.fetchdata(this.goodid)
    },
    mounted(){
    	if(getCookie('username')){
	       	this.username=getCookie('username')
	       	this.unlogin=1
	    }
	    else{
	    	this.unlogin=0
	    }
    },
    methods:{
    	fetchdata(goodid){
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
              	self.list=res.data[0]
              	self.imagelist=self.list.good_photo.split(",")
              	self.imagetop=self.imagelist[0]
              	self.isloading=false
              }
             }).catch(function(error) {
                console.log(error);
             });
		},
		//购买数量的增减
		plus_num(){
			this.num++
			if(this.num>this.list.good_num){
				this.num=this.list.good_num
			}
		},
		rem_num(){
			this.num--
			if(this.num<1){
				this.num=1
			}
		},
		//找到当前用户信息
		finduserid(){
			var self = this; //很关键
			if(self.unlogin==1){
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
					self.checkcarlist(self.userid)
					self.checkShopcar(self.userid)			
				}).catch(function(err){
					console.log(err);
				});
			}
			else{
				self.$router.push("/login")
			}
		},
		//检查当前购物车列表购物车,根据商品显示badge
		checkcarlist(id){			
			var self=this		
			self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/show-shoppingcar',
			   data:{
			   	userid:id
			   },
			   timeout: 3000
			}).then(function(res){
				console.log("badge",res.data)
				self.notice=res.data.length
			}).catch(function(err){
				console.log(err);
			});			
			//this.addShopcar()	
		},
		//检查用户是否有该商品记录
		checkShopcar(id){
			var self = this;
			self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/check-shoppingcar',
			   data:{
			   	userid:self.userid,
			   	goodid:Number(self.goodid)
			   },
			   timeout: 3000
			}).then(function(res){
				var listnum=res.data
				console.log(res.data)
				if(listnum.length!=0){
					console.log(listnum[0].goodnum)
					self.addShopcar(listnum[0].goodnum)//有商品记录
				}
				else{
					self.addusercar()//没有商品记录
				}
			}).catch(function(err){
				console.log(err);
			});
		},
		//如果用户/商品没有记录,添加用户+商品
		addusercar(){
			var self = this;
			self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/add-usercar',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	userid:self.userid,
			   	goodid:self.goodid,
			   	goodnum:self.num	
			   },
			   timeout: 3000
			}).then(function(res){
				console.log(res)
			}).catch(function(err){
				console.log(err);
			});
			self.$message({
	          message: '添加购物车成功',
	          type: 'success'
	        });
	        self.checkcarlist(self.userid)
		},
		//如果商品有记录，更新记录
		addShopcar(goodnum){
			var self = this;
			goodnum=Number(goodnum)+self.num
			self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/add_shopingcar',
			   data:{
			   	goodnum:goodnum,
			   	goodid:self.goodid,		   
			   	userid:self.userid
			   },
			   timeout: 3000
			}).then(function(res){
				this.success()
				console.log(res)
			}).catch(function(err){
				console.log(err);
			});
			self.$message({
	          message: '添加购物车成功',
	          type: 'success'
	        });
	        self.checkcarlist(self.userid)//更新badge
		},
		//立刻购买
		payNow(){
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
				self.addOrder(orderid,self.goodid,self.num,self.list.good_price,userid,address,sex,tel,email,time)
			}).catch(function(err){
				console.log("出错了")
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
      	},
		//回到顶部
		pageScroll(){
			scroll(0,0)
		}
		

    } 
}
</script>

<style>
*{padding:0;margin:0;}
.top_show{width:95%;height:25rem;margin:5rem 5% 0 0;font-family:"黑体";}
.top_show h3{line-height:2rem;color:#1b1b1b;text-align:left;}
.top_show img{width:65%;float:left;}
.top_show .top_info{width:32%;float:right;margin-top:4rem;}
input[type=number] {  -moz-appearance:textfield;  }  
input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{
    -webkit-appearance: none;  
    margin: 0;  
}
.top_show .top_info .handle{margin:0.8rem 0;}
.top_show .top_info .handle small{background:#eee;display:block;padding:0.5rem;line-height:1.5rem;}
.top_show .top_info .handle input{
	font-size: 1rem;text-align:center;
	padding: 0.4rem 0.8rem 0.4rem 0.8rem;
	border:0.1rem solid #1b1b1b;
	border-radius: 0.2rem;
	margin:0 0.5rem;
}
.top_show .top_info button{
	background-color: #fff;color: #1b1b1b;
	border-radius: 1.2rem;border:0.1rem solid #1b1b1b;
	font-size: 1rem;font-family: "微软雅黑";
	letter-spacing:0.1rem;
	padding: 0.5rem 0.8rem 0.5rem 0.8rem;
	cursor: pointer;
}
.top_show .top_info button:hover{background-color: #1b1b1b;color: #fff;}
.imglist{width:100%;}
.imglist img{width:100%;}

.righticon{float:right;right:0;top:50%;position:fixed;}
.righticon .iconfont{
	color:#1b1b1b;float:right;right:0;
	border:0.1rem solid #3b3b3b;
	padding:0.8rem;
	background:rgba(255,255,255,0.8);
	margin-right:-0.1rem;
	font-size:1.5rem;
	line-height:3rem;
}
.righticon .iconfont:hover{
	background:#1b1b1b;
	color:#fff;
	cursor:pointer;
}
.item {
  margin-top: -10px;
  margin-right: -5px;
  border:none;
}
.item sup{margin-right:50px;margin-top: 5px;}
</style>

