// 引入express框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入body-parser模块，用来处理post请求参数
const bodyPaser = require('body-parser');
// 导入express-session模块
const session = require('express-session');
// 导入art-template模板引擎
const template = require('art-template');
// 导入dateformat模块
const dateFormat = require('dateformat');
// 导入morgan
const morgan = require('morgan');
// 导入config
const config = require('config');
// 创建网站服务器
const app = express();
// 数据库连接
require('./model/connect');
// 处理post请求参数
app.use(bodyPaser.urlencoded({extended: false}));
// 配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 10 * 60 * 1000
        // secure: true
    }
}));

// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
// 当渲染后缀为art时，所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// 获取系统环境变量 返回值是对象
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('development'));
}else if (process.env.NODE_ENV === 'production'){
    app.use(morgan('production'));
    // console.log('prodution');
}else if (process.env.NODE_ENV === 'test'){
    app.use(morgan('test'));
}


// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');
const other = require('./route/other');

// 拦截请求，判断用户登陆状态
app.use('/admin', require('./middleWare/loginGuard'));
// app.use('/home', require('./middleWare/homeGuard'));
// 为路由匹配请求路径
app.use('/', other);
app.use('/home', home);
app.use('/admin', admin);


app.use((err, req, res, next) => { 
    // res.send('error');
    if(!err) return;
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if(attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }

    return res.redirect(`${result.path}?${params.join('&')}`);

});

// 监听端口
app.listen(config.get('port'), () => {    
    console.log(`网站服务器启动成功，请访问http://${config.get('host')}:${config.get('port')}`);
});
