// 将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
// 导入mongoosee-sex-page
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // const page = req.query.page;
    // 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    let page = req.query.page || 1

    let pagesize = 10;
    let count = await Article.countDocuments();
    let total = Math.ceil(count / pagesize);

    
    let articles = await pagination(Article).find().sort({"publishDate": 1, "author": -1, "sorts": 1, "title": 1 }).page(page).size(pagesize).display(total).populate('author').exec();

    
    // console.log(articles.pages);
    // res.send(articles);
    return res.render('admin/article.art', {
        articles: articles
    });
}