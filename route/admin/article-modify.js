const { Article } = require('../../model/article');
// 引入第三方模块formidable
const formidable = require('formidable');
const { date } = require('joi');


module.exports = async (req, res, next) => {
    const id = req.query.id;
    // res.send(id);
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
     // 2.解析表单
    form.parse(req, async (err, fields, files) => {
    // res.send(files);
        const { title, author, content, sorts } = fields;
        let publishDate = fields.publishDate;
        const cover = files.cover;

        if( !title || !sorts ) {
            
            // return res.redirect('/admin/article')
            let obj = {path: '/admin/article-edit', message: '内容未填写，不能进行用户信息的修改', id: id};
            return next(JSON.stringify(obj))
            
        }
        // console.log(id)
        if( !publishDate )  publishDate = new Date();
        // return res.send(publishDate);

        let article = await Article.findOne({_id: id});

        // res.send(article);
        await Article.updateOne({_id: id}, {
            title: title,
            author: author,
            publishDate: publishDate,
            content: content,
            sorts: sorts
        });

        // res.send(articles);
        // let articles = await Article.findOne({_id: id});
        // res.send(articles);
        return res.redirect('/admin/article');
    })

}