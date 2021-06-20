const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // return res.send('Welcome to note show page')
    const listId = req.query.id;
    let page = req.query.page || 1;


    let pagesize = 10;
    let count = await Article.find({sorts: listId});
    let listArr = [];
    count.forEach((item) => {
        listArr.push(item.sorts);
    });

    let num = Array.from(new Set(listArr));
    // console.log('length', num.length);
    // return res.send(num);

    let total = Math.ceil(num.length / pagesize);


    // let results = await pagination(Article).find().page(page).size(pagesize).display(total).populate('author').exec();
    let result = await pagination(Article).find({sorts: listId}).page(page).size(pagesize).display(total).populate('author').exec();
    // let result = await pagination(Article).page(1).size(4).display(5).find().populate('author').exec();
    // const results = JSON.parse(result)
    // return res.send(result.records[0].sorts)
    // list menu
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