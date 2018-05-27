<template>
<div id="content">
	<div v-if="all">
	<!-- 图片轮播 -->
	<div class="swiper-container">
	  <div class="swiper-wrapper">
	    <div class="swiper-slide"><img src="../assets/img/banner1.jpg"></div>
	    <div class="swiper-slide"><img src="../assets/img/banner2.jpg"></div>
	    <div class="swiper-slide"><img src="../assets/img/banner3.jpg"></div>
	    <div class="swiper-slide"><img src="../assets/img/banner4.jpg"></div>
	    <div class="swiper-slide"><img src="../assets/img/banner5.jpg"></div>
	  </div>
	  <div class="swiper-pagination"></div>
	</div>
	<div class="space"></div>
	<!-- 最新作品 -->
	<div class="works">
		<div class="works-title">
			<span class="works-top">新品发布平台</span><br>
			<span class="works-bot">从设计到制作，直线设计师正品大牌入手</span>
		</div>
		<div class="space"></div>
		<div class="works-show">
			<ul v-loading="isloading">
				<li v-for="(gooditem,index) in newgoods" @click="showDetail(gooditem.clicktime,gooditem.id)">
				  <router-link :to="{ name:'Detail',params:{goodid:gooditem.id}}"> 
				  	<img :src="gooditem.good_photo">
				  	<span style="color:#000">{{gooditem.good_name}}<br>￥<b>{{gooditem.good_price}}</b>起</span><br>
				  </router-link> 
				</li> 
				<li><span style="fon-size:2rem;color:#aaa;line-height:2.8rem;" @click="all=false"><br><br>more>><br>更多精彩商品<br><br></span></li>
			</ul>
		</div>
	</div>
	
	<div class="space"></div>
	<div class="space-gray"></div>
	<div class="space"></div>
	<!-- 经典作品 -->
	<div class="works">
		<div class="works-title">
			<span class="works-top">经典作品发布</span><br>
			<span class="works-bot">从过去到现在，热度从未退却，持续发酵</span>
		</div>
		<div class="space"></div>
		<div class="works-show">
			<ul v-loading="isloading">
				<li v-for="(gooditem,index) in hotgoods" @click="showDetail(gooditem.clicktime,gooditem.id)"> 
				  <router-link :to="{ name:'Detail',params:{goodid:gooditem.id}}"> 
				  	<img :src="gooditem.good_photo">
				  	<span style="color:#000">{{gooditem.good_name}}<br>￥<b>{{gooditem.good_price}}</b>起</span><br>
				  </router-link> 
				</li> 
			</ul>
		</div>
	</div>
	<!-- 各种分类显示 	-->
	
	
	<div class="space"></div>
	<div class="space-gray"></div>
	<div class="space"></div>
	<!-- 精彩案例 -->
	<div class="case">
		<div class="works-title">更多家实景生活晒单/应证生活美学</div>
		<div class="space"></div>
		<table><tr>
			<td v-for="item in judgedata">
				<div class="box"><img :src="item.photo[0]"></div> 
			</td>
			<!--<td><div class="box"><img src="../assets/img/test/s5.jpg"></div></td>-->
		</tr></table>
		<router-link to="/judge"><div class="case-more">查看更多晒单</div></router-link>
	</div>
	</div>
	<div v-else style="margin-top:2rem;"> 
		<div class="space"></div>
	<!-- 所有商品 -->
	<div class="works"  :style="'height:'+num+'rem'">
		<div class="works-title">
			<span class="works-top">商品展示平台</span><br>
			<span class="works-bot">从设计到制作，所有商品展示集锦</span>
		</div>
		<div class="space"></div>
		<div class="works-show">
			<ul v-loading="isloading">
				<li v-for="(gooditem,index) in gooddata" @click="showDetail(gooditem.clicktime,gooditem.id)">
				  <router-link :to="{ name:'Detail',params:{goodid:gooditem.id}}"> 
				  	<img :src="gooditem.good_photo">
				  	<span style="color:#000">{{gooditem.good_name}}<br>￥<b>{{gooditem.good_price}}</b>起</span><br>
				  </router-link> 
				</li> 
				<li><span style="fon-size:2rem;color:#aaa;line-height:2.8rem;" @click="all=true"><br><br>《《back<br>更多精彩内容<br><br></span></li>
			</ul>
		</div>
	</div>
	</div>
</div>
</template>

<script>
import Vuex from "vuex";  
import axios from "axios"; 
import Swiper from "Swiper";  
import '@/assets/css/index.css'

export default{   
    data(){  
      return{ 
      	all:true,
      	num:1,
      	isloading:true, 
        goods: [],
        newgoods:[],
        hotgoods:[],
        leng:0,
        leng1:0 ,
        judgedata:null
      }  
    },  
    created(){ 
    	this.fetchnewdata() 
    	this.fetchhotdata() 
    	this.judgeshow()
    },
    mounted(){
    	var mySwiper = new Swiper('.swiper-container', {
			autoplay: true,
			effect : 'fade',
			pagination: {
			    el: '.swiper-pagination',
			    clickable :true,
		        bulletActiveClass: 'my-bullet-active',
		  	},
		}); 
    },
    methods:{
    	fetchnewdata(){
    		var self = this; //很关键
			self.$axios({
			   method: 'get',
			   url: 'api/good-new',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   timeout: 3000
            }).then(function(res) {
               if(res.data == -1){
                  console.log(res)
              }else{
              	self.gooddata=res.data
              	self.newgoods=res.data
              	self.leng=self.newgoods.length
              	self.new()
              	self.isloading=false
              	if(self.gooddata.length%4==0){
					self.num=self.gooddata.length/4*22
				}
				else{
					self.num= Math.ceil(self.gooddata.length/4)*22
				}
              }
             }).catch(function(error) {
                console.log(error);
             });
		},
		fetchhotdata(){
			var self = this; //很关键
			self.$axios({
			   method: 'get',
			   url: 'api/good-hot',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   timeout: 3000
            }).then(function(res) {
               if(res.data == -1){
                  console.log(res)
              }else{
              	self.hotgoods=res.data
              	self.leng1=self.hotgoods.length
              	self.hot()
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
			this.newgoods=this.newgoods.slice(0,7)
		},
		hot(){
			for(var i=0;i<this.leng1;i++){
				var array=this.hotgoods[i].good_photo.split(",")
				this.hotgoods[i].good_photo=array[0]
			}
			this.hotgoods=this.hotgoods.slice(0,8)
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
		},
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
				self.judgedata=self.judgedata.slice(0,5)
				for(var i=0;i<self.judgedata.length;i++){
				   self.judgedata[i].photo=self.judgedata[i].photo.split(",")
				}
			}).catch(function(err){
				console.log(err);
			});
		},
    } 
}
</script>

<style>
</style>