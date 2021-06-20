// 导入用户集合构造函数
const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    // 接受请求参数
    const { email, password } = req.body;
    // res.send(req.body);
    if (email.trim().length == 0 || password.trim().length == 0) {
        // return res.status(400).send('<h4>邮件地址或者密码错误</h4>');
        return res.status(400).render('admin/error', {msg: '邮件地址或者密码错误'});
        
    }

    // 根据邮箱地址
    let user = await User.findOne({email});
    
    if(user) {
        // 密码进行比对
        let isValid = await bcrypt.compare(password, user.password);
        if ( isValid ){
            // 登陆成功
            // 讲用户名存储在请求对象中
            req.session.username = user.username;
            // res.send(user.role);
            req.session.role = user.role;
            // req.session.root = user.root;
            // res.send(user.role);
            req.app.locals.userInfo = user;
            // res.send(req.app.locals.userInfo);

            if(user.role == 'admin' || (user.root == 0 && user.role == 'root')) {
                res.redirect('/admin/user');
            }else {
                res.redirect('/home/');
            }
            
            
        }else {
            return res.status(400).render('admin/error', {msg: '邮箱地址或者密码错误'});
        }

    }else {
    
    // 没有查询到用户
    return res.status(400).render('admin/error', {msg: '邮箱地址或者密码错误'});
    }
}

module.exports = login;