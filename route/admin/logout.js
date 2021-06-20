module.exports = (req, res) => {
    // del session
    req.session.destroy(function () {
        // del  cookie
        res.clearCookie('connect.sid');

        // 清除模板中的用户信息
        req.app.locals.userInfo = null;

        // 重定向到用户登陆页面
        // return res.send('logout');
        return res.redirect('/home');
    });
};
