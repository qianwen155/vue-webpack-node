<template> 
	<div id="content" style="margin:5rem 2rem 0 2rem;">
		<el-row>
		  <el-col :span="8" v-for="(item, index) in judgedata" :key="index">
		    <el-card :body-style="{ padding: '0px' }">
		     <img :src="item.photo[0]" class="image">
		      <div style="padding: 14px;">
		        <span style="font-size:0.8rem;color:#a8a8a8;line-height:1rem;height:1rem;overflow-y:hidden">{{item.content}}</span>
		        <el-rate v-model="item.rate" disabled></el-rate> 
		        <span style="color:#bbb;font-size:0.5rem">{{item.time}}</span>
		        <el-button type="text" style="float:right;margin-top:-0.5rem" @click="showjudge(index,judgedata)">详情</el-button>
		      </div>
		    </el-card>
		  </el-col>
		</el-row>
		<!--评价的具体信息-->
		<el-dialog title="评价信息" :visible.sync="dialogFormVisible" width="90%">
			<div class="imglist" v-for="image in imagelist">
				<img :src="image">
			</div>
			<div class="content">
				{{time}}<br>
			{{content}}
			</div>
		</el-dialog> 
	</div>
</template>

<script> 
export default {
	data(){
		return{
			judgedata:null,
			dialogFormVisible:false,
			imagelist:null,
			content:'',
			time:''
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
				}
			}).catch(function(err){
				console.log(err);
			});
		},
		//评价的详情
		showjudge(index,rows){
			this.imagelist=rows[index].photo
			this.dialogFormVisible=true
			this.content=rows[index].content
			this.time=rows[index].time
		}
		
    }
}
</script>

<style> 
.el-col{width:24%;margin:0.5rem 0.3rem;}
.image{width:100%;}
.imglist{width:75%;display:inline-block;}
.imglist img{width:100%;}
.content{width:23%;float:right;display:inline-block;position:absolute;top:5rem;padding-left:1rem;}
</style>