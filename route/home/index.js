const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // return res.send('Welcome to note show page')

    let page = req.query.page || 1;


    let pagesize = 10;
    let count = await Article.countDocuments();
    let total = Math.ceil(count / pagesize);


    // let results = await pagination(Article).find().page(page).size(pagesize).display(total).populate('author').exec();
    let result = await pagination(Article).find().page(page).size(pagesize).display(total).populate('author').exec();
    // let result = await pagination(Article).page(1).size(4).display(5).find().populate('author').exec();
    // const results = JSON.parse(result)
    // return res.send(result.records[0].sorts)
    let sortsArr = await Article.find({});
    let arr = [];
    sortsArr.forEach((item) => {
        arr.push(item.sorts);
    });

    let sorts = Array.from(new Set(arr));
    // return res.send(sorts);
    // return res.send(result);
    // return;
    
    try {
        return res.render('home/default.art', {
            result: result,
            sorts: sorts
        });
    }catch(ex) {
        return res.send(ex.message);
    }
}