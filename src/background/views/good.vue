<template>
	<el-main>
        <el-table :data="listdata" stripe height="475" v-loading="isloading">
	        <el-table-column label="商品名称" width="150">
	        	<template slot-scope="scope">
		           {{scope.row.good_name}} 
		        </template>
	        </el-table-column>
	        <el-table-column label="日期" width="250">
	        	<template slot-scope="scope">
		           {{scope.row.good_addtime}} 
		        </template>
	        </el-table-column>
	        <el-table-column label="库存" width="100">
	        	<template slot-scope="scope">
		           {{scope.row.good_num}} 
		        </template>
	        </el-table-column>
	        <el-table-column label="价格" width="120">
	        	<template slot-scope="scope">
		           {{scope.row.good_price}} 
		        </template>
	        </el-table-column>
	        <el-table-column label="类型" width="160">
	        	<template slot-scope="scope">
		           {{scope.row.type_name}} 
		        </template>
	        </el-table-column>
	        <el-table-column label="图片组">
	        	<template slot-scope="scope">
	        		<img :src="'../'+scope.row.good_photo" width="50" height="50" style="border:none"/>
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
        	<el-button type="primary" icon="el-icon-plus" circle style="float:left" @click="add"></el-button >
	    </div>

		<!-- 编辑对话框-->
	    <el-dialog title="编辑商品信息" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="商品名称" :label-width="formLabelWidth">
		      <el-input v-model="form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="库存数量" :label-width="formLabelWidth">
		      <el-input-number v-model="form.num" auto-complete="off"></el-input-number>
		    </el-form-item>
		    <el-form-item label="商品价格" :label-width="formLabelWidth">
		      <el-input v-model="form.price" auto-complete="off"> 
		      	<template slot="append">元</template> 
		      </el-input>
		    </el-form-item>
		    <el-form-item label="类型" :label-width="formLabelWidth">
		      <el-select v-model="form.type" placeholder="请选择商品类型">
		        <el-option label="沙发" value="1"></el-option>
		        <el-option label="茶桌" value="2"></el-option>
		        <el-option label="凳椅" value="3"></el-option>
		        <el-option label="柜架" value="4"></el-option>
		        <el-option label="灯饰" value="5"></el-option>
		        <el-option label="床具" value="6"></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="图片组" :label-width="formLabelWidth">
		     	<el-upload class="upload-demo" ref="upload" action="http://127.0.0.1:3000/adminupload" :on-remove="handleRemove" :file-list="fileList" :on-success="handleSuccess" :auto-upload="false" list-type="picture-card" :limit="8" :on-exceed="handleExceed">
				  <i class="el-icon-plus"></i>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb（默认第一张为展示图）</div>
				  
				</el-upload>
				<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
				<el-dialog :visible.sync="dialogVisible">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="editData">确 定</el-button>
		  </div>
		</el-dialog>  

     <!-- 编辑对话框-->
	    <el-dialog title="添加商品" :visible.sync="dialogaddForm">
		 <el-form :model="formadd">
		    <el-form-item label="商品名称" :label-width="formLabelWidth">
		      <el-input v-model="formadd.good_name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="库存数量" :label-width="formLabelWidth">
		      <el-input-number v-model="formadd.good_num" auto-complete="off"></el-input-number>
		    </el-form-item>
		    <el-form-item label="商品价格" :label-width="formLabelWidth">
		      <el-input v-model="formadd.good_price" auto-complete="off"> 
		      	<template slot="append">元</template> 
		      </el-input>
		    </el-form-item>
		    <el-form-item label="类型" :label-width="formLabelWidth">
		      <el-select v-model="formadd.good_typeid" placeholder="请选择商品类型">
		        <el-option label="沙发" value="1"></el-option>
		        <el-option label="茶桌" value="2"></el-option>
		        <el-option label="凳椅" value="3"></el-option>
		        <el-option label="柜架" value="4"></el-option>
		        <el-option label="灯饰" value="5"></el-option>
		        <el-option label="床具" value="6"></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="图片组" :label-width="formLabelWidth">
		     	<el-upload class="upload-demo" ref="upload" action="http://127.0.0.1:3000/adminupload" :on-remove="handleRemove" :file-list="fileListadd" :on-success="handleaddSuccess" :auto-upload="false" list-type="picture-card" :limit="8" :on-exceed="handleExceed">
				  <i class="el-icon-plus"></i>
				  
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
				<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
				<el-dialog :visible.sync="dialogVisible">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
		  	</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogaddForm = false">取 消</el-button>
		    <el-button type="primary" @click="addgood">确 定</el-button>
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
        dialogFormVisible: false,
        dialogaddForm:false,
        form: {
        	id:'',
          name: '',
          num: '',
          price: '',
          type: '',
          good_photo:[]
        },
        arr:[],
        formLabelWidth: '100px',
        fileList:[],
        dialogImageUrl: '',
        dialogVisible: false,
        //添加商品的参数
        fileListadd:[],
        formadd:{
	        good_name:'',
	        good_price:0,
	        good_num:0,
	        good_addtime:'',
	        good_typeid: '',
	        good_photo:[]
        }
        
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
			   url: '../api/goodlist',
			   timeout: 3000
            }).then(function(res) {
               if(res.data == -1){
                  console.log(res)
              }else{
              	self.listdata=res.data
              	self.leng=self.listdata.length
              	self.ss()
              	self.isloading=false
              }
             }).catch(function(error) {
                console.log(error);
              });
		},
		//处理数据
		ss(){
			for(var i=0;i<this.leng;i++){
				var array=this.listdata[i].good_photo.split(",")
				this.listdata[i].good_photo=array[0]
			}
		},
        deleteRow(index, rows) {
	    	this.$axios({
			   method: 'post',
			   url: '../api/good-del',
			   data:{
			   	id:rows[index].id
			   },
			   timeout: 3000
	        }).then(function(res) {
	        	rows.splice(index,1)
	          this.OperateSuccess()
	        }).catch(function(error) {
	            console.log(error);
	        });
        },
        add(){
        	this.dialogaddForm=true
        	this.arr=[]
        	this.formadd.good_name=''
	        this.formadd.good_price=0
	        this.formadd.good_num=0
	        this.formadd.good_typeid=''
	        this.formadd.good_photo=["jpg"]
	        this.fileListadd=[]
        },
        addgood(){
        	this.dialogaddForm = false
        	this.formadd.good_addtime=new Date()
        	this.$axios({
			   method: 'post',
			   url: '../api/good-add',
			   headers: {'X-Requested-With': 'XMLHttpRequest'},
			   data:{
			   	typeid:this.formadd.good_typeid,
			   	good_name:this.formadd.good_name,
			   	good_price:this.formadd.good_price,
			   	good_num:this.formadd.good_num,
			   	good_photo:this.formadd.good_photo,
			   	good_addtime:this.formadd.good_addtime
			   },
			   timeout: 3000
            }).then(function(res) {
               if(res.data == -1){
                  console.log(res)
              }else{
              	console.log(res.data)
              }
            }).catch(function(error) {
                console.log(error);
            });
            this.dialogFormVisible=false 
            this.OperateSuccess()
            this.fetchdata()  
        },
        //编辑数据
        editShow(index,row){
        	this.dialogFormVisible=true
        	this.arr=[]
        	this.form.name=row[index].good_name
        	this.form.num=row[index].good_num
        	this.form.price=row[index].good_price
        	this.form.type=row[index].typeid
        	this.form.good_photo=row[index].good_photo
        	this.form.id=row[index].id
        },
        editData(index){
        	this.$axios({
			   method: 'post',
			   url: '../api/good-edit',
			   data:{
			   	good_name:this.form.name,
			   	good_num:this.form.num,
			   	good_price:this.form.price,
			   	typeid:this.form.type,
			   	good_photo:this.form.good_photo,
			   	id:this.form.id
			   },
			   timeout: 3000
            }).then(function(res) {
            	console.log(res)
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
        	this.$message.warning(`当前限制选择 8 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      	},
      	handleSuccess(response, file, fileList){
      		this.arr.push(response.path)
      		var str=this.arr.join(",")
      		this.form.good_photo=str
      	},
      	handleaddSuccess(response, file, fileList){     		
      		this.arr.push(response.path)
      		var str=this.arr.join(",")
      		this.formadd.good_photo=str
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
	    handlePreview(file) {
	        console.log(file);
	    },
    }
};
</script>

<style>
.el-form-item{margin-right:20px;}
.el-dialog{width:90%;}
</style>