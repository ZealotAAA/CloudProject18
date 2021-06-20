const { User } = require('../../model/user');
module.exports = async (req, res) => {

    // 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    const { message, id } = req.query;
    // return res.send(req.app.locals.userInfo);
    if(req.app.locals.userInfo.state == 1) return res.render('admin/user', {
        message: 'Your account has been frozen'
    });
    
    // 如果当前传递了id参数
    if(id) {
        let user = await User.findOne({_id: id});
        
        // 渲染用户编辑页面(修改)
        return res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: 'Change'
        });
    }else {
        
        return res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: 'Add'
        });
    }
};