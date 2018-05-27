<template> 
<el-main>
	<ul>
		<li v-for="judgeitem in judgedata" style="border-bottom:1px solid #eee;padding:1rem;">
			<span style="width:100%;display:block;font-size:0.8rem;color:#aaa;border-bottom:1px solid #ccc;line-height:30px;">
				<div style="width:30px; height:30px; border-radius:50%; overflow:hidden;display:inline-block"><img :src="'http://localhost:8082/'+judgeitem.userlist.imageurl" width="50" :alt="judgeitem.userlist.user_name"></div>
				{{judgeitem.good_name}}&nbsp;&nbsp;{{judgeitem.time}}
				<el-rate v-model="judgeitem.rate" disabled style="float:right;display:inline;"></el-rate> 
			</span> 
			<div style="margin:0.5rem 0;display:block;" v-show="judgeitem.photo">
				<span v-for="itemphoto in judgeitem.photo">
			<img :src="'http://localhost:8082/'+itemphoto" width="150" style="border:1px solid #ccc;margin:0.5rem"> </span>
			</div>
			<span style="width:80%;line-height:2.8rem">{{judgeitem.content}}</span>
			<span style="float:right;width:5%;margin-top:-0.8rem;"><el-button type="text" @click="deljudge(judgeitem.judge_id)" style="line-height:2.8rem">删除</el-button></span>
		</li> 
	</ul>
</el-main>
</template>

<script> 
export default{ 
 	data(){  
      return{ 
      	isloading:true,
      	userid:'',//当前用户id
      	judgedata:null,
      } 
  	},
  	created(){
  		this.judgeshow()
  	},
  	methods:{
		//显示评价
		judgeshow(){
			var self=this
	  		self.$axios({
			   method: 'get',
			   url: 'http://localhost:8082/api/judge',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   timeout: 3000
			}).then(function(res){
				self.judgedata=res.data
				for(var i=0;i<self.judgedata.length;i++){
				   self.judgedata[i].photo=self.judgedata[i].photo.split(",")
				   var time=new Date(Date.parse(self.judgedata[i].time)+3600*1000*8)
				   self.judgedata[i].time=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()	
				   self.userdata(i,self.judgedata[i].userid)
				}
				console.log(self.judgedata)
			}).catch(function(err){
				console.log(err);
			});
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
		},
		//显示用户信息
		userdata(index,userid){
			var self=this
	  		self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/show-user',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{id:userid},
			   timeout: 3000
			}).then(function(res){
				self.judgedata[index].userlist=res.data[0]
			}).catch(function(err){
				console.log(err);
			});
		}
	}
}
</script>