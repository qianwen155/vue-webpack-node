var sqlMap = {
    user: {
        add: 'insert into user( user_name, user_pwd) values ( ?, ?)',
        select_name: 'select user_name,user_pwd from user',    //查询 账号密码
        check: 'SELECT * from user where user_name = ?' ,     //查询 用户
        show:'SELECT * from user',
        show_user:'SELECT * from user where id=?',
        edit:'UPDATE user SET nickname=?,sex=?,tel=?,address=?,email=?,imageurl=? WHERE id=?',//编辑用户
        user_del:'DELETE from user WHERE id=?',//删除用户
        good_click:'UPDATE good SET clicktime=? WHERE id=?',
        good_show:'SELECT * FROM good WHERE id=?',//展示商品信息

        type_good:'SELECT * FROM good JOIN good_type ON good_type.t_id=? AND good_type.t_id=good.typeid',//根据商品类型显示

        show_shoppingcar:'SELECT * FROM shopping_car WHERE userid=?',
        check_shoppingcar:'SELECT * FROM shopping_car WHERE userid=? AND goodid=?',
        add_usercar:'insert into shopping_car( userid, goodid,goodnum) values ( ?, ?,?)',//查询购物车是否有商品
        add_shoppingcar:'UPDATE shopping_car SET goodnum=? WHERE userid=? AND goodid=?',//更新购物车
        del_shoppingcar:'DELETE from shopping_car WHERE userid=? AND goodid=?',//删除记录

        add_order:'INSERT INTO user_order(order_id,goodid,goodnum,goodprice,order_person,order_personname,order_address,order_sex,order_tel,order_email,order_time,total,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',//添加订单
        check_order:'SELECT * FROM user_order WHERE order_id=?',//查询所有订单
        check_userorder:'SELECT * FROM user_order WHERE order_person=?',//查询当前用户订单
        del_order:'DELETE from user_order WHERE order_id=?',//删除订单
        status_order:'UPDATE user_order SET status=? WHERE order_id=?',//改变订单状态
        address_order:'UPDATE user_order SET order_personname=?,order_address=?,order_tel=?,status=? WHERE order_id=?',//改变订单的收货地址

        user_address:'SELECT * FROM user_address WHERE userid=?',//查询该账户的收货地址
        add_address:'insert into user_address( userid, username,usertel,useraddress) values ( ?, ?,?,?)',//添加收货地址
        del_address:'DELETE from user_address WHERE id=?',//删除地址

        add_judge:'insert into user_judge(userid,goodid,content,photo,time,rate) values (?,?,?,?,?,?)',//添加评价
        del_judge:'DELETE from user_judge WHERE judge_id=?',//删除评价
        check_judge:'SELECT * FROM user_judge JOIN good ON user_judge.userid=? AND user_judge.goodid=good.id',//查看评价
        judge:'SELECT * FROM user_judge'//所有评价
    },
    //管理员sql命令
    admin:{
    	add: 'insert into admin( admin_name, admin_pwd) values ( ?, ?)',
        select_name: 'SELECT admin_name,admin_pwd from admin',    //查询 username
        check: 'SELECT * from admin where admin_name = ?',      //查询 用户
        show:'SELECT * from admin',
        editamdin:'UPDATE admin SET sex=?,tel=?,imageurl=? WHERE id=? ',//编辑用户
        admin_del:'DELETE from admin WHERE id=?', //删除管理员

        check_good:'SELECT * from good JOIN good_type ON good.typeid=good_type.t_id ORDER BY good.id ASC',  //查询所有商品
        add_good:'INSERT into good(typeid,good_name,good_price,good_num,good_photo,good_addtime) values (?,?,?,?,?,?)' , //添加商品
        delete_good:'DELETE from good where id=?',  //删除商品
        editgood:'UPDATE good SET good_name=?,good_num=?,good_price=?,typeid=?,good_photo=? WHERE id=? ',//编辑商品
        good_new:'SELECT * FROM good ORDER BY good.good_addtime DESC',//根据时间排序，越近越排前
        good_hot:'SELECT * FROM good ORDER BY good.clicktime DESC',//根据热度排序

        check_order:'SELECT * from user_order JOIN good ON user_order.goodid=good.id '  //查询订单
        
    }
}
module.exports = sqlMap;