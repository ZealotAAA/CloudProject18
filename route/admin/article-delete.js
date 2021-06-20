const { Article } = require('../../model/article');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
    const deleId = req.query.id;
    // return res.send(deleId);
    

    const article = await Article.findOne({_id: deleId});
    // console.log(article);
    // \uploads\default\default.jpg
    // return res.send(article.cover);
    const cover = article.cover;
    const uploadDir = path.join(__dirname, '../../public');
    // D:\code data\node\production-blog\production\public
    // return res.send(uploadDir);
    let coverfix = cover.split('uploads')[1];
    // \default\default.jpg
    // return res.send(coverfix);
    if(cover && coverfix != '\\default\\default.jpg'){
      fs.unlink(`${uploadDir}${cover}`,(err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('delete ok');
        }
      });
    } 

    
    let contentimg = JSON.parse(article.contentImage);

    contentimg.forEach((item) => {
      fs.unlink(`${uploadDir}\\uploads\\content${item}`,(err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('delete ok');
        }
      });
    })

    // return res.send(contentFile);

    await Article.findOneAndDelete({_id: deleId});

    return res.redirect('/admin/article');

}