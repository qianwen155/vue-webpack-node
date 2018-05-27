var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
           code: '1',
           msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

// 增加用户接口
router.use('/register', (req, res) => {
    var sql_name = $sql.user.check
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql_name,params.user_name,function(err,result) {
        if(err) {
            console.log(err)
        }
        if(result[0]===undefined) {
            conn.query(sql,[params.user_name,params.user_pwd], function(err, result) {
                if(err) {
                    console.log(err)
                }
                if(result) {
                    jsonWrite(res, result)
                }
            })
        }else {
            res.send('-1')    //当前注册username与数据库重复时，data返回-1
        }
    })
    
});
router.use('/login', (req, res) => {
    var sql = $sql.user.select_name;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.user_name,params.user_pwd], function(err, result) {
        if(result[0]===undefined) {
            res.send('-1') ;//当前用户不存在或者密码错误
        }else{
            if (err) {
                console.log(err);
            }
            if (result) {
                jsonWrite(res, result);
            }
        }  
    })
});

//退出
router.get("/logout",function(req, res) {
    delete req.session.user;
    res.end();
});

//管理员角色
router.use('/login-ad', (req, res) => {
    var sql = $sql.admin.select_name;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.admin_name,params.admin_pwd], function(err, result) {
        if(result[0]===undefined) {
            res.send('-1') ;//当前用户不存在或者密码错误
        }else{
            if (err) {
                console.log(err);
            }
            if (result) {
                jsonWrite(res, result);
            }
        }  
    })
});
router.use("/logout-ad",function(req, res) {
    delete req.session.admin;
    res.end();
});
//管理员管理信息接口
router.use('/goodlist', (req, res) => {
	var sql = $sql.admin.check_good
    getCateNamesDatas(sql, res);
});
router.use('/good-new', (req, res) => {
	var sql = $sql.admin.good_new
    getCateNamesDatas(sql, res);
});
router.use('/good-hot', (req, res) => {
	var sql = $sql.admin.good_hot
    getCateNamesDatas(sql, res);
});
router.use('/user', (req, res) => {
	var sql = $sql.user.show
    getCateNamesDatas(sql, res);
});
router.use('/admin-user', (req, res) => {
	var sql = $sql.admin.show
    getCateNamesDatas(sql, res);
});
router.use('/order', (req, res) => {
	var sql = $sql.admin.check_order
    getCateNamesDatas(sql, res);
});
router.use('/judge', (req, res) => {
	var sql = $sql.user.judge
    getCateNamesDatas(sql, res);
});
function getCateNamesDatas(sql, res) {
    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('database err').end();
        } else {
            res.setHeader("Access-Control-Allow-Origin","*")
            res.send(data);
        }
    });
}
//增删改接口
router.use('/show-user', (req, res) => {
	var sql = $sql.user.show_user
	var param = req.body;
	var params=[param.id];
    editDatas(sql,params,res);
});
router.use('/use-edit', (req, res) => {
	var sql = $sql.user.edit
	var param = req.body;
	var params=[param.nickname,param.sex,param.tel,param.address,param.email,param.imageurl,param.id];
    editDatas(sql,params,res);
});
router.use('/admin-add', (req, res) => {
	var sql = $sql.admin.add
	var param = req.body;
	var params=[param.admin_name,param.admin_pwd];
    editDatas(sql,params,res);
});
router.use('/admin-edit', (req, res) => {
	var sql = $sql.admin.editamdin
	var param = req.body;
	var params=[param.sex,param.tel,param.imageurl,param.id];
    editDatas(sql,params,res);
});
router.use('/good-edit', (req, res) => {
	var sql = $sql.admin.editgood
	var param = req.body;
	var params=[param.good_name,param.good_num,param.good_price,param.typeid,param.good_photo,param.id];
    editDatas(sql,params,res);
});

router.use('/good-add', (req, res) => {
	var sql = $sql.admin.add_good
	var param = req.body;
	var params=[param.typeid,param.good_name,param.good_price,param.good_num,param.good_photo,param.good_addtime];
    editDatas(sql,params,res);
});
router.use('/admin-add', (req, res) => {
	var sql = $sql.admin.add
	var param = req.body;
	var params=[param.admin_name,param.admin_pwd];
    editDatas(sql,params,res);
});

router.use('/good-del', (req, res) => {
	var sql = $sql.admin.delete_good
	var param = req.body;
	var params=[param.id];
    editDatas(sql,params,res);
});
router.use('/admin-del', (req, res) => {
	var sql = $sql.admin.admin_del
	var param = req.body;
	var params=[param.id];
    editDatas(sql,params,res);
});
router.use('/user-del', (req, res) => {
	var sql = $sql.user.user_del
	var param = req.body;
	var params=[param.id];
    editDatas(sql,params,res);
});
router.use('/find_user', (req, res) => {
	var sql = $sql.user.check
    var param = req.body;
	var params=[param.user_name];
    editDatas(sql,params,res);
});
router.use('/good-click', (req, res) => {
	var sql = $sql.user.good_click
	var param = req.body;
	var params=[param.clicktime,param.id];
    editDatas(sql,params,res);
});
router.use('/type-good', (req, res) => {
	var sql = $sql.user.type_good
	 var param = req.body;
	var params=[param.t_id];
     editDatas(sql,params,res);
});
router.use('/show-shoppingcar', (req, res) => {
	var sql = $sql.user.show_shoppingcar
	 var param = req.body;
	var params=[param.userid];
     editDatas(sql,params,res);
});
router.use('/good-details', (req, res) => {
	var sql = $sql.user.good_show
	 var param = req.body;
	var params=[param.id];
     editDatas(sql,params,res);
});
router.use('/check-shoppingcar', (req, res) => {
	var sql = $sql.user.check_shoppingcar
    var param = req.body;
	var params=[param.userid,param.goodid];
    editDatas(sql,params,res);
});
router.use('/add-usercar', (req, res) => {
	var sql = $sql.user.add_usercar
	 var param = req.body;
	var params=[param.userid,param.goodid,param.goodnum];
     editDatas(sql,params,res);
});
router.use('/add_shopingcar', (req, res) => {
	var sql = $sql.user.add_shoppingcar
	 var param = req.body;
	var params=[param.goodnum,param.userid,param.goodid];
     editDatas(sql,params,res);
});
router.use('/del-shoppingcar', (req, res) => {
	var sql = $sql.user.del_shoppingcar
	 var param = req.body;
	var params=[param.userid,param.goodid];
     editDatas(sql,params,res);
});
router.use('/add-order', (req, res) => {
	var sql = $sql.user.add_order
	 var param = req.body;
	var params=[param.order_id,param.goodid,param.goodnum,param.goodprice,param.order_person,param.order_personname,param.order_address,param.order_sex,param.order_tel,param.order_email,param.order_time,param.total,param.status];
     editDatas(sql,params,res);
});
router.use('/check-order', (req, res) => {
	var sql = $sql.user.check_order
	 var param = req.body;
	var params=[param.order_id];
     editDatas(sql,params,res);
});
router.use('/del-order', (req, res) => {
	var sql = $sql.user.del_order
	 var param = req.body;
	var params=[param.order_id];
     editDatas(sql,params,res);
});
router.use('/status-order', (req, res) => {
	var sql = $sql.user.status_order
	 var param = req.body;
	var params=[param.status,param.order_id];
     editDatas(sql,params,res);
});
router.use('/check-userorder', (req, res) => {
	var sql = $sql.user.check_userorder
	 var param = req.body;
	var params=[param.order_person];
     editDatas(sql,params,res);
});
router.use('/user-address', (req, res) => {
	var sql = $sql.user.user_address
	 var param = req.body;
	var params=[param.userid];
     editDatas(sql,params,res);
});
router.use('/add-address', (req, res) => {
	var sql = $sql.user.add_address
	 var param = req.body;
	var params=[param.userid,param.username,param.usertel,param.useraddress];
     editDatas(sql,params,res);
});
router.use('/del-address', (req, res) => {
	var sql = $sql.user.del_address
	 var param = req.body;
	var params=[param.id];
     editDatas(sql,params,res);
});
router.use('/address-order', (req, res) => {
	var sql = $sql.user.address_order
	 var param = req.body;
	var params=[param.order_personname,param.order_address,param.order_tel,param.status,param.order_id];
     editDatas(sql,params,res);
});
router.use('/add-judge', (req, res) => {
	var sql = $sql.user.add_judge
	var param = req.body;
	var params=[param.userid,param.goodid,param.content,param.photo,param.time,param.rate];
    editDatas(sql,params,res);
});
router.use('/del-judge', (req, res) => {
	var sql = $sql.user.del_judge
	var param = req.body;
	var params=[param.judge_id];
    editDatas(sql,params,res);
});
router.use('/check-judge', (req, res) => {
	var sql = $sql.user.check_judge
	var param = req.body;
	var params=[param.userid];
    editDatas(sql,params,res);
});
function editDatas(sql,params,res) {
    conn.query(sql, params,(err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('edit err').end();
        } else {
            if (data.length == 0) {
            	//jsonWrite(res, data)
            	res.setHeader("Access-Control-Allow-Origin","*")
                res.send(data);
            } else {
            	res.setHeader("Access-Control-Allow-Origin","*")
                res.send(data);
            }
        }
    });
}



module.exports = router;