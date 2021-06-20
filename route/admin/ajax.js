const { Article } = require('../../model/article');
const { json } = require('body-parser');

module.exports = async (req, res) => {
    // console.log(req.headers['content-type']);
    // 获取post数据
    let postdata = '';
    req.on('data', chunk => {
        postdata += chunk.toString();
    })
    // 获取整个post数据后，对其进行处理
    req.on('end', async () => {
        // console.log('chunk', postdata)
        // console.log(JSON.parse(postdata).head)
        const data = JSON.parse(postdata)
        const str = "^" + data.data;
        const reg = new RegExp(str);

        if(data.head === 'title') {
            let article = await Article.find({title: reg});
            // console.log(article);
            // console.log('stringify:',JSON.stringify(article));
            // return res.send(article)
            // return res.status(200).send(article);
            // console.log(article[1].title)
            let arr = [];
            article.forEach((item) => {
                arr.push(item.title);
            })
            // console.log(arr);

            return res.status(200).send(JSON.stringify(arr));
        }else if(data.head === 'sorts') {
            let article = await Article.find({sorts: reg});

            let arr = [];
            article.forEach((item) => {
                arr.push(item.sorts);
            })
            
            return res.status(200).send(JSON.stringify(arr));
        }
        return res.status(400).send('不在查询范围内');



    })
}