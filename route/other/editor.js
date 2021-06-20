const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const { Article } = require('../../model/article');
global.imgarr = [];
module.exports = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../../public/uploads/content');
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        // console.log('files:', files)
        // console.log('upload.path:',files.upload.path);

        let fileName = files.upload.path.split('content')[1];
        // console.log('fileName:',fileName);
        
        global.imgarr.push(fileName);
        console.log('Current upload content：', global.imgarr);
        console.log('tostring', global.imgarr.toString());
        console.log('JSON.stringify', JSON.stringify(global.imgarr));
        if(!fileName){
            return res.send({
                "uploaded": 0,
                "filename": `${fileName}`,
                "url": `/uploads/content${fileName}`
            })
        }


        return res.send({    
            "uploaded": 1,
            "filename": `${fileName}`,
            "url": `/uploads/content${fileName}`
        
    })
    })

   
    
};

