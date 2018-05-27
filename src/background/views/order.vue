<template>
	<el-main>
      <el-table :data="listorderdata" stripe height="475" v-loading="isloading">
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
        <el-table-column label="商品名称" width="150" align="center">
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
        <el-table-column label="下单日期" width="150">
        	<template slot-scope="scope">
	           {{scope.row.order_time}} 
	        </template>
        </el-table-column>
        <el-table-column label="数量">
        	<template slot-scope="scope">
	           {{scope.row.goodnum}} 
	        </template>
        </el-table-column>
        <el-table-column label="价格" width="120">
        	<template slot-scope="scope">
	           {{scope.row.total}} 
	        </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
        	<template slot-scope="scope">
	           {{scope.row.status}} 
	        </template>
        </el-table-column>
      </el-table>
<!--      <div class="block">
	    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="prev, pager, next, jumper" :total="leng">
	    </el-pagination>
	  </div>-->
    </el-main>
</template>

<script>
export default {
	name:'Goodlist',
    data() {
      return {
      	isloading:true,
        listorderdata:null,
        currentPage: 0,
        pagesize:10,
        leng:0
      }
    },
    created(){
    	this.fetchdata()
    },
    methods:{
    	fetchdata(){
    		var self = this; //很关键
			self.$axios({
			   method: 'get',
			   url: '../api/order',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   timeout: 3000
            }).then(function(res) {
               if(res.data == -1){
                  console.log(res)
              }else{
              	self.listorderdata=res.data
              	self.leng=self.listorderdata.length
              	for(var i=0;i<self.leng;i++){
              		var time=new Date(Date.parse(self.listorderdata[i].order_time)+3600*1000*8)
					self.listorderdata[i].order_time=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()
					self.listorderdata[i].good_photo=self.listorderdata[i].good_photo.split(",")[0]
              	}  
              	console.log(self.listorderdata)           	
              	self.isloading=false
              }
             }).catch(function(error) {
                console.log(error);
              });
		}
    }
};
</script>

<style> 
.demo-table-expand .el-form-item{width:40%;height:30px;float:left;}
.demo-table-expand .el-form-item label{color:#aaa;width:100px;float:left;}
</style>