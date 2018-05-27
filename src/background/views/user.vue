<template>
	<el-main>
      <el-table :data="listdata.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe height="475" v-loading="isloading">
        <el-table-column label="用户编号" width="120">
        	<template slot-scope="scope">
	           {{scope.row.id}} 
	        </template>
        </el-table-column>
        <el-table-column label="用户名" width="140">
        	<template slot-scope="scope">
	           {{scope.row.user_name}} 
	        </template>
        </el-table-column>
        <el-table-column label="昵称">
        	<template slot-scope="scope">
	           {{scope.row.nickname}} 
	        </template>
        </el-table-column>
        <el-table-column label="性别" width="120">
        	<template slot-scope="scope">
	           {{scope.row.sex}} 
	        </template>
        </el-table-column>
        <el-table-column label="联系方式" width="160">
        	<template slot-scope="scope">
	           {{scope.row.tel}} 
	        </template>
        </el-table-column>
        <el-table-column label="地址" width="160">
        	<template slot-scope="scope">
	           {{scope.row.address}} 
	        </template>
        </el-table-column>
        <el-table-column label="电子邮件" width="160">
        	<template slot-scope="scope">
	           {{scope.row.email}} 
	        </template>
        </el-table-column>
        <el-table-column label="头像" width="140">
        	<template slot-scope="scope">
	          <img :src="'../'+scope.row.imageurl" width="50" height="50"/>
	        </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
	      <template slot-scope="scope">
	      	<el-button type="primary" icon="el-icon-edit" circle @click="editShow(scope.$index,listdata)"></el-button>
	      	<el-button type="danger" icon="el-icon-delete" circle @click.native.prevent="deleteRow(scope.$index, listdata)"></el-button>
	      </template>
		</el-table-column>
      </el-table>
        <div class="block">
		    <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next" :total="leng">
		    </el-pagination>
	    </div>

	    <!-- 编辑对话框-->
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

    </el-main>
</template>

<script>
export default {
	name:'Goodlist',
    data() {
      return {
      	isloading:true,
        listdata:null,
        leng:0,//数组的长度
        currentPage: 1,//当前页
        pagesize:10,//每页的条数
        dialogFormVisible: false,
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
        fileList:[],
        formLabelWidth: '100px'
        //id:0,//添加商品的参数
        //typeid:"",
        //good_name:"",
        //good_price:0,
        //good_num:"",
        //good_addtime:"",
       // checktime:0
      }
    },
    created(){
    	this.fetchdata()
    },
    methods:{
    	fetchdata(){
    		var self = this; //很关键
    		self.isloading=true
			self.$axios({
			   method: 'get',
			   url: '../api/user',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   timeout: 3000
            }).then(function(res) {
               if(res.data == -1){
                  console.log(res)
              }else{
              	self.listdata=res.data
              	self.leng=self.listdata.length
              	self.ss()
              	console.log(self.listdata)
              	self.isloading=false
              }
             }).catch(function(error) {
                console.log(error);
              });
		},
		//处理数据
		ss(){
			for(var i=0;i<this.leng;i++){
				if(this.listdata[i].sex==1){
					this.listdata[i].sex="男"
				}
				else{
					this.listdata[i].sex="女"
				}
			}
		},
        deleteRow(index, rows) {
          rows.splice(index, 1);
          const h = this.$createElement;
          this.$notify({
            title: '操作成功',
            message: h('i', { style: 'color: teal'}, '成功删除一条信息'),
            type: 'success'
          });
        },
        editShow(index,row){
        	this.dialogFormVisible=true
        	this.form.id=row[index].id
        	this.form.name=row[index].user_name
        	this.form.nickname=row[index].nickname
        	this.form.tel=row[index].tel
        	this.form.sex=row[index].sex
        	this.form.email=row[index].email
        	this.form.address=row[index].address
        	this.form.imageurl=row[index].imageurl
        },
        editData(){
        	this.$axios({
			   method: 'post',
			   url: '../api/use-edit',
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
               if(res.data == -1){
                  console.log(res)
              }else{
              	//console.log(res.data)
              }
            }).catch(function(error) {
                console.log(error);
            });
            this.dialogFormVisible=false 
            this.OperateSuccess() 
            this.fetchdata()  	
        },
        submitUpload() {
        	this.$refs.upload.submit();
      	},
      	handleExceed(files, fileList) {
        	this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      	},
      	handleSuccess(response, file, fileList){
      		this.form.imageurl=response.path
      	},
        OperateSuccess(){
        	const h = this.$createElement;
          	this.$notify({
	            title: '操作成功',
	            message: h('i', { style: 'color: teal'}, '成功更新数据'),
	            type: 'success'
	         }); 
        },
        handleRemove(file, fileList) {
        	console.log(file, fileList);
	    },
        handleSizeChange(val) {
        	this.pagesize=val
        },
        handleCurrentChange(val) {
        	this.currentPage=val
        }
    }
};
</script>

<style>
.el-form-item{margin-right:20px;}
</style>