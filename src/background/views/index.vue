<template>
	<el-container :style="'border: 1px solid #eee;height:'+hh+'px;'">
	  <el-aside width="15%" style="background-color: #303133" id="asidehh">
		    <el-menu :default-openeds="[]">
		      <el-submenu index="1">
		        <template slot="title"><router-link to="/home"><i class="el-icon-menu"></i>首页</router-link></template>
		      </el-submenu>
		      <el-submenu index="2">
		        <template slot="title"><i class="el-icon-document"></i>订单管理</template>
		          <el-menu-item index="2-2"><router-link to="/admin-index/order">订单详情</router-link></el-menu-item>
		      </el-submenu>
		      <el-submenu index="3">
		        <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
		          <el-menu-item index="2-4-1"><router-link to="/admin-index/goodlist"><span>商品详情</span></router-link></el-menu-item>
		      </el-submenu>
		      <el-submenu index="4">
		        <template slot="title"><i class="el-icon-news"></i>用户管理</template>
		          <el-menu-item index="2-4-1"><router-link to="/admin-index/user">客户管理</router-link></el-menu-item>
		          <el-menu-item index="2-4-2"><router-link to="/admin-index/admin-user">管理员管理</router-link></el-menu-item>
		      </el-submenu>
		      <el-submenu index="5">
		        <template slot="title"><i class="el-icon-news"></i>评论管理</template>
		          <el-menu-item index="2-5-1"><router-link to="/admin-index/judge-mangers">评论信息</router-link></el-menu-item>
		      </el-submenu>
		    </el-menu>
	  </el-aside>
	  
	  <el-container>
	    <el-header style="text-align: right;">
	    	<!--<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/admin-index' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/admin-index/order' }">订单详情</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/admin-index/goodlist' }">商品详情</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/admin-index/users' }">客户管理</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/admin-index/admin-user' }">管理员管理</el-breadcrumb-item>
			</el-breadcrumb>-->
	      <el-dropdown>
	        <i class="el-icon-setting" style="margin-right: 15px"></i>
	        <el-dropdown-menu slot="dropdown">
	          <el-dropdown-item><span @click="quit">注销</span></el-dropdown-item>
	        </el-dropdown-menu>
	      </el-dropdown>
	      <span>{{admin}}</span>
	    </el-header>

	    <router-view></router-view>
	    
	  </el-container>
	</el-container>
</template>

<style>
	.el-aside .el-menu{
		background-color: #303133;
	    color: #fff;
	}
	.el-aside .el-submenu__title,.el-aside .el-submenu__title i{ color: #fff;}
	.el-aside .el-submenu__title:hover{background-color: #606266;color:#eee;}
	.el-aside .el-menu--inline,.el-menu-item-group__title{background-color:#606266}
	/*/.el-aside .el-menu--inline ul li:hover{color:#333;}*/
  .el-header {
    background-color: #E4E7ED;
    color: #333;
    font-size: 0.8rem;
    line-height: 3rem;
    height: 3rem !important;
  }
  .el-breadcrumb{display: inline;line-height: 3rem;float: left;}
  .el-aside {
    color: #333;
  }
  .el-table,.has-gutter tr th{text-align:center;}
  .block{text-align:center;width:100%;padding-top:20px;}
  .el-pagination{height:3rem;}
  .el-pagination .el-pager li.active{border-radius:1.5rem !important;background:#409EFF;color:#fff;}
  .el-pagination__jump{margin-top:-12px;}
</style>

<script>
import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
export default {
    data() {
      return {
      	admin:"",//管理员名称
      	hh:''
      }
    },
    created(){
    	this.admin=getCookie('username')
    	this.hh=window.innerHeight
    },
    mounted(){
	    if(getCookie('username')){
	        //this.$router.push(this.$router)
	    }
	    else{
	    	this.$router.push("/admin")
	    }
    },
    methods:{
       quit(){
            delCookie('username')
            alert("退出登录")
            this.$router.push('/admin')
        }
    }
};
</script>
