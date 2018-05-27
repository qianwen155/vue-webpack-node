<template> 
	<div id="content" style="margin:5rem 2rem 0 2rem">
		<el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="用户名称" :label-width="formLabelWidth">
		      <el-input v-model="form.name" auto-complete="off" :disabled="true"></el-input>
		    </el-form-item>
		    <el-form-item label="昵称" :label-width="formLabelWidth">
		      <el-input v-model="form.nickname" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="性别" :label-width="formLabelWidth">
		       <el-radio-group v-model="form.sex">
			    <el-radio :label="1">男</el-radio>
			    <el-radio :label="2">女</el-radio>
			  </el-radio-group> 
		    </el-form-item>
		    <el-form-item label="联系方式" :label-width="formLabelWidth">
		      <el-input v-model="form.tel" auto-complete="off" type="tel"></el-input>
		    </el-form-item>
		    <el-form-item label="电子邮件" :label-width="formLabelWidth">
		      <el-input v-model="form.email" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="地址" :label-width="formLabelWidth">
		      <el-input v-model="form.address" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="头像" :label-width="formLabelWidth">
		     	<el-upload class="upload-demo" ref="upload" action="http://127.0.0.1:3000/adminupload" :on-remove="handleRemove" :file-list="fileList" :on-success="handleSuccess" :auto-upload="false" list-type="picture" :limit="1" :on-exceed="handleExceed">
				  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
				  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="editData()">确 定</el-button>
		  </div>
		</el-dialog> 
		<!--添加收货地址-->
		<el-dialog title="添加收货地址" :visible.sync="addressFormVisible" width="40%">
		  <el-form :model="formadd">
		    <el-form-item label="姓名">
		      <el-input v-model="formadd.name" auto-complete="off"></el-input>
		    </el-form-item>
			<el-form-item label="联系方式">
		      <el-input v-model="formadd.tel" auto-complete="off" type="number"></el-input>
		    </el-form-item>
		    <el-form-item label="地址">
		      <el-input v-model="formadd.address" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="addressFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="Addaddress">确 定</el-button>
		  </div>
		</el-dialog> 
		<!--添加商品评价-->
		<el-dialog title="评价商品" :visible.sync="judgeFormVisible" width="60%">
		  <el-form :model="formjudge">
		    <el-form-item label="商品名称">
		      {{formjudge.goodname}}
		    </el-form-item>
		   	<el-form-item label="图片组" :label-width="formLabelWidth">
		     	<el-upload class="upload-demo" ref="upload" action="http://127.0.0.1:3000/adminupload" :on-remove="handleRemove" :file-list="fileList" :on-success="handleSuccesses" :auto-upload="false" list-type="picture-card" :limit="5" :on-exceed="handleExceedes">
				  <i class="el-icon-plus"></i>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb（默认第一张为展示图）</div>
				  
				</el-upload>
				<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
				<el-dialog :visible.sync="dialogVisible">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
		    </el-form-item>
			<el-form-item label="评价">
		      <el-input type="textarea" v-model="formjudge.content" placeholder="说一点什么..." style="width:70%"></el-input>
		    </el-form-item>
		    <el-form-item label="评分">
		      <el-rate v-model="formjudge.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" style="padding-top:0.6rem"></el-rate> 
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="judgeFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="Addjudge">确 定</el-button>
		  </div>
		</el-dialog> 		
		
		<el-tabs tab-position="left">
		    <el-tab-pane label="个人信息">
		    	<el-form> 
		    		<el-form-item label="用户名称" :label-width="formLabelWidth">
				      {{userlist.user_name}}
				    </el-form-item>
				    <el-form-item label="昵称" :label-width="formLabelWidth">
				      {{userlist.nickname}}
				    </el-form-item>
				    <el-form-item label="性别" :label-width="formLabelWidth">
				      {{userlist.sex}}
				    </el-form-item>
				    <el-form-item label="联系方式" :label-width="formLabelWidth">
				      {{userlist.tel}}
				    </el-form-item>
				    <el-form-item label="地址" :label-width="formLabelWidth">
				      {{userlist.address}}
				    </el-form-item>
				    <el-form-item label="电子邮件" :label-width="formLabelWidth">
				      {{userlist.email}}
				    </el-form-item>
				    <el-form-item label="头像" :label-width="formLabelWidth">
				      <img :src="userlist.imageurl" width="150">
				    </el-form-item>
				    <el-form-item style="width:100%;margin-left:100px;">
				    	<el-button @click="editShow" type="primary">编辑</el-button>
					</el-form-item>
		    	</el-form>	    	
		    </el-tab-pane>
		    <el-tab-pane label="收货地址">
		    	<div class="address">
					<el-row :gutter="12">
					  <el-col :span="8" v-for="(additem,index) in addressdata" :key="index">
					    <el-card shadow="hover">
					      收货人：{{additem.username}}<br>
						  联系方式：{{additem.usertel}}<br>
						  地址：{{additem.useraddress}}<br>
						  <i class="el-icon-delete" style="color:red;cursor:pointer" @click="deladdress(additem.id)"></i>
						  <el-button type="text" style="font-size:0.5rem;float:right;">收货地址{{index+1}}</el-button>
						  
						</el-card>
					  </el-col>
					  <el-col :span="8">
					    <el-card shadow="never" >
					      <center><i class="el-icon-plus" style="font-size:5rem;color:#ccc;cursor:pointer" @click="addressFormVisible=true"></i></center>
					    </el-card>
					  </el-col>
					</el-row>				
				</div>
			</el-tab-pane>
		    <el-tab-pane label="购买记录"> 
		    	<el-table :data="shopping" stripe fit style="width: 96%;margin:0 2% 0 2%;" v-loading="isloading">
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
		      		<el-table-column label="操作" align="center">
		      			<template slot-scope="scope">
		      				<el-button type="text" @click="writejudge(scope.$index,shopping)">评价</el-button> 
			        	</template>
		      		</el-table-column>
				</el-table>
				<div class="pay">
					<div class="pay_info">
					<router-link to="/shoppingcar"><small><<返回购物车</small></router-link>
					</div>
				</div>
		    </el-tab-pane>
		    <el-tab-pane label="评价管理"> 
		    	<ul>
		    		<li v-for="judgeitem in judgedata" style="border-bottom:1px solid #eee;padding:1rem;">
		    			<span style="width:100%;display:block;font-size:0.8rem;color:#aaa;border-bottom:1px solid #ccc;padding:0.5rem 0 0.5rem 0;">
		    				{{judgeitem.good_name}}&nbsp;&nbsp;{{judgeitem.time}}
		    				<el-rate v-model="judgeitem.rate" disabled style="float:right;display:inline;"></el-rate> 
		    			</span> 
		    			<div style="margin:0.5rem 0;display:block;" v-show="judgeitem.photo">
		    				<span v-for="itemphoto in judgeitem.photo">
		    			<img :src="itemphoto" width="150" style="border:1px solid #ccc;margin:0.5rem"> </span>
		    			</div>
		    			<span style="width:80%;line-height:2.8rem">{{judgeitem.content}}</span>
		    			<span style="float:right;width:5%;margin-top:-0.8rem;"><el-button type="text" @click="deljudge(judgeitem.judge_id)" style="line-height:2.8rem">删除</el-button></span>
		    		</li> 
		    	</ul>
		    </el-tab-pane>
		</el-tabs>
	</div>
</template>

<script> 
import { setCookie,getCookie,delCookie } from '../assets/js/cookie.js'
export default{ 
 	data(){  
      return{ 
      	arr:[],
      	isloading:true,
      	username:'',
      	userid:'',//当前用户id
      	userlist:null,//当前用户信息
      	shopping:[],//订单展示
      	shoppinglist:null,
      	total:0,
      	addressdata:null,
      	judgedata:null,
      	dialogVisible:false,
      	dialogImageUrl:'',
      	dialogFormVisible:false,
      	addressFormVisible:false,
      	judgeFormVisible:false,
      	fileList:[],
      	form: {
          id:'',
          name: '',
          nickname: '',
          sex: '',
          tel: '',
          email:'',
          address:'',
          imageurl:''
        },
        formadd:{
        	name:'',
        	tel:'',
        	address:''
        },
        formjudge:{
        	goodname:'',
        	goodid:'',
        	image:'',
        	content:'',
        	rate:null
        },
        formLabelWidth: '100px',
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
				if(self.userlist.sex==2){
					self.userlist.sex="女"
				}else{
					self.userlist.sex="男"
				}
				self.checkorder(self.userid)
				self.address(self.userid)
				self.judgeshow(self.userid)
			}).catch(function(err){
				console.log(err);
			});
		},
		//个人信息
		editShow(){
        	this.dialogFormVisible=true
        	this.form.id=this.userlist.id
        	this.form.name=this.userlist.user_name
        	this.form.nickname=this.userlist.nickname
        	this.form.tel=this.userlist.tel
        	this.form.sex=this.userlist.sex
        	this.form.email=this.userlist.email
        	this.form.address=this.userlist.address
        	this.form.imageurl=this.userlist.imageurl
        },
        editData(){
        	this.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/use-edit',
			   data:{
			   	nickname:this.form.nickname,
			   	sex:this.form.sex,
			   	tel:this.form.tel,
			   	address:this.form.address,
			   	email:this.form.email,
			   	imageurl:this.form.imageurl,
			   	id:this.form.id
			   },
			   timeout: 3000
            }).then(function(res) {
            	this.$message({message:"修改成功！",type:"success"})
            	this.finduserid(this.username)
            }).catch(function(error) {
                console.log(error);
            });
            this.dialogFormVisible=false 
        },
        submitUpload() {
        	this.$refs.upload.submit();
      	},
      	handleExceed(files, fileList) {
        	this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      	},
      	handleExceedes(files, fileList) {
        	this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      	},
      	handleSuccess(response, file, fileList){
      		this.form.imageurl=response.path
      	},
      	handleSuccesses(response, file, fileList){
      		this.arr.push(response.path)
      		var str=this.arr.join(",")
      		this.formjudge.image=str
      	},
      	handleRemove(file, fileList) {
        	console.log(file, fileList);
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
		//增加收货地址
		Addaddress(){
			var self=this
      		self.addressFormVisible = false
      		if(self.formadd.name==''||self.formadd.tel==''||self.formadd.address==''){
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
			   	username:self.formadd.name,
			   	usertel:self.formadd.tel,
			   	useraddress:self.formadd.address
			   },
			   timeout: 3000
			}).then(function(res){
				self.$message({
		          message: '添加成功',
		          type: 'success'
		        });
		        self.address(self.userid)
			}).catch(function(err){
				console.log(err);
			});
			}
		},
		//删除收货地址
		deladdress(id){
			var self=this
	  		self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/del-address',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{id:id},
			   timeout: 3000
			}).then(function(res){
				self.$message({
		          message: '删除成功',
		          type: 'success'
		        });
				self.address(self.userid)
			}).catch(function(err){
				console.log(err);
			});
		},
		//添加评价信息
		writejudge(index,rows){
			this.judgeFormVisible = true
			this.formjudge.image=''
			this.formjudge.goodname=rows[index].good_name
			this.formjudge.goodid=rows[index].goodid
			this.formjudge.content='',
			this.formjudge.rate=null
		},
		//显示评价
		judgeshow(userid){
			var self=this
	  		self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/check-judge',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{userid:userid},
			   timeout: 3000
			}).then(function(res){
				self.judgedata=res.data
				for(var i=0;i<self.judgedata.length;i++){
				   self.judgedata[i].photo=self.judgedata[i].photo.split(",")
				   var time=new Date(Date.parse(self.judgedata[i].time)+3600*1000*8)
				   self.judgedata[i].time=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()	
				}
			}).catch(function(err){
				console.log(err);
			});
		},
		//添加评价
		Addjudge(){
			var self=this
      		if(self.formjudge.content==''||self.formjudge.rate==null){
      			self.$message({
		          message: '请完善信息',
		          type: 'warning'
		        });
      		}
      		else{
      		self.judgeFormVisible = false
      		var time=new Date()
      		console.log(self.formjudge)
			self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/add-judge',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	userid:self.userid,
			   	goodid:self.formjudge.goodid,
			   	content:self.formjudge.content,
			   	photo:self.formjudge.image,
			   	time:time,
			   	rate:self.formjudge.rate
			   },
			   timeout: 3000
			}).then(function(res){
				self.$message({
		          message: '添加成功',
		          type: 'success'
		        });
		        self.judgeshow(self.userid)
			}).catch(function(err){
				console.log(err);
			});
			}
		},
		//删除评价
		deljudge(id){
			console.log(id)
			var self=this
	  		self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/del-judge',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{judge_id:id},
			   timeout: 3000
			}).then(function(res){
				self.$message({
		          message: '删除成功',
		          type: 'success'
		        });
				self.judgeshow(self.userid)
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
.el-tabs{margin-bottom:2rem;}
.el-tabs .el-form .el-form-item{width:50%;float:left;}
.el-dialog label{width:20%;}
.el-dialog .el-input{width:70%;}
.el-col{margin:0.5rem 0;}
.pay_info small{font-size:0.8rem;color:#bbb;cursor:pointer;}
.pay_info small:hover{color:#1b1b1b;}
.pay_info{float:right;margin-right:2rem;}
.pay_info .el-button{margin-top:1rem;margin-right:1rem;} 
.demo-table-expand .el-form-item{width:45%;height:30px;}
.demo-table-expand .el-form-item label{color:#aaa;width:100px;}
</style>