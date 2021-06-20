const { Article } = require('../../model/article');

module.exports = async (req, res) => {   
    // 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    const { message, id } = req.query;

    if(req.app.locals.userInfo.state == 1) return res.render('admin/article', {
        message: '您的账户已经被冻结'
    });

    if(id) {
        let article = await Article.findOne({_id: id});
        // res.send(article);

        // 渲染文章编辑页面（修改）
        return res.render('admin/article-edit', {
            message: message,
            article: article,
            link: `/admin/article-modify?id=${id}`,
            button: '修改'
        })
    }else {
        return res.render('admin/article-edit', {
            message: message,
            link: '/admin/article-add',
            button: '添加'
        })
    }
    
}