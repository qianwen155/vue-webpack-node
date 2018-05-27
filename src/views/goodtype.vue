<template>
<div id="content" style="margin-top:5rem;">
	<!-- 商品类型筛选 -->
	<div class="works" :style="'height:'+num+'rem'">
		<div class="works-show">
			<ul v-loading="isloading">
				<li v-for="(gooditem,index) in newgoods" @click="showDetail(gooditem.clicktime,gooditem.id)">
				  <router-link :to="{ name:'Detail',params:{goodid:gooditem.id}}"> 
				  	<img :src="'http://localhost:8082/'+gooditem.good_photo">
				  	<span style="color:#000">{{gooditem.good_name}}<br>￥<b>{{gooditem.good_price}}</b>起</span><br>
				  </router-link> 
				</li> 
			</ul>
		</div>
	</div>
	<div class="space"></div>
	<div class="space"></div>
</div>
</template>

<script>
import Vuex from "vuex";   
import '@/assets/css/index.css'

export default{   
    data(){  
      return{ 
      	isloading:true, 
        newgoods:[],
        leng:0,
        num:1
      }  
    },  
    created(){ 
    	this.newgoods=[]
    	this.fetchtypedata(this.$route.params.typeid) 
    },
    watch:{
    	 '$route.params.typeid'() {this.fetchtypedata(this.$route.params.typeid)}
    },
    methods:{
    	fetchtypedata(tid){
    		var self = this; //很关键
			self.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/type-good',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	t_id:tid
			   },
			   timeout: 3000
            }).then(function(res) {
               if(res.data == -1){
                  console.log(res)
              }else{
              	self.newgoods=res.data
              	console.log(self.newgoods)
              	self.leng=self.newgoods.length
              	self.new()
              	self.isloading=false
              }
             }).catch(function(error) {
                console.log(error);
             });
		},
		//处理数据
		new(){
			for(var i=0;i<this.leng;i++){
				var array=this.newgoods[i].good_photo.split(",")
				this.newgoods[i].good_photo=array[0]
			}
			if(this.leng%4==0){
				this.num=this.leng/4*16
			}
			else{
				this.num= Math.ceil(this.leng/4)*16
			}
		},		
		//记录点击次数+展示详情页
		showDetail(clicktime,id){
			clicktime=clicktime+1
			this.$axios({
			   method: 'post',
			   url: 'http://localhost:8082/api/good-click',
			   data:{
			   	clicktime:clicktime,
			   	id:id
			   },
			   timeout: 3000
            }).then(function(res) {
            	console.log(res)
             }).catch(function(error) {
                console.log(error);
             });
		}
    } 
}
</script>

<style>
</style>