// 引入joi模块
const Joi = require('joi');
// 引入用户集合的构造函数
const { User, validateUser } = require('../../model/user');
// 引入加密模块
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
    // res.send('ok');
    
    // 出错模块
    try {
        await validateUser(req.body);
    }catch (ex) {
        // return res.redirect(`/admin/user-edit?message=${ex.message}`);
        return next(JSON.stringify({path: '/admin/user-edit', message: ex.message}));
    }

    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({email: req.body.email});
    
    if (user) {
        return next(JSON.stringify({path:'/admin/user-edit', message: '邮箱地址已经被占用'}));
    }

    // 对密码进行加密处理
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    // 加密
    const password = await bcrypt.hash(req.body.password, salt);
    // 替换密码
    req.body.password = password;
    // 将用户信息添加到数据库中
    await User.create(req.body);
    // 将页面重定向到用户列表页面
    return res.redirect('/admin/user');

    // res.send(req.body);
};