// 引入第三方模块formidable
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');
const fs = require('fs');

module.exports =  (req, res, next) => {
    //  res.send('ok');
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
    // console.log(form.uploadDir);
    // 3.保留上传文件的后缀
    form.keepExtensions = true;
    // 4.解析表单
    form.parse(req, async (err, fields, files) => {
        // res.send(files);
        // return res.send(files.cover.path.split('public')[1]);
        let coverFile = files.cover.path.split('public')[1];
        let filedDir = path.join(__dirname, '../../public');
        let location = `${filedDir}${coverFile}`;
        let fix = files.cover.path.split('.')[1];
        if(!fields.title || !fields.author || !fields.sorts) {
            // return res.send(location);
                fs.unlink(`${location}`,(err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('delete ok');
                  }
                });


            return next(JSON.stringify({path: '/admin/article-edit', message: '标题和分类未填写'}))
        }
        // fwxtest-
        if(!fields.publishDate)  fields.publishDate = new Date();
        if(!coverFile || !fix){
          coverFile = '\\uploads\\default\\default.jpg';
          fs.unlink(`${location}`,(err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('delete ok');
            }
          });
        }
        // return res.send(coverFile);
        const formData = await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: coverFile,
            content: fields.content,
            sorts: fields.sorts,
            contentImage: JSON.stringify(global.imgarr)
        })

        global.imgarr = [];
        console.log('增加后的global:', global.imgarr);

        // console.log(formData);
        return res.redirect('/admin/article');
    })
}