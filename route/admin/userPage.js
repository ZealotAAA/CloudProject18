// 导入用户集合构造函数
const { User } = require('../../model/user');
// const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // res.render('admin/user', {
    //     msg: req.session.username
    // });
    // 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';
    // req.session.role = 'admin';
    // return res.send(req.session.role);

    // 接收客户端传递过来的当前页参数
    let page = req.query.page || 1;
    // res.send(page);
    // return;
    let pagesize = 10;
    let count = await User.countDocuments({});
    // res.send('用户总数是' + count);
    // return;
    // 总页数
    let total = Math.ceil(count / pagesize);
    // 让页码对应的数据查询开始位置
    let start = (page - 1) * pagesize;


    // 将所有用户信息从数据库中查询出来
    let users = await User.find({}).limit(pagesize).skip(start).sort({"root": 1, "username": 1, "email": 1, "state": 1, "role": 1});
    
    // res.send(users);
    return res.render('admin/user', {
        users: users,
        page: page,
        total: total,
        count: count
    })
};