# 开始
1. 开启mongodb, 在cmd中测试
    - mongod开启
    - 测试是否打开: mongo -u username -p pwd    
2. 确认已经下载了nodejs
3. 在主目录下运行
    - npm i
4. 修改配置文件:
    - config文件夹下有三个文件，分别为: 开发、生产、测试环境
        - 根据上图的情况修改db对象中的user和pwd
5. 创建用户:
    - model文件夹下的user.js
    - 82-83行, 取消注释, 并根据自己需求修改
6. 安装完成后, 打开cmd, 输入指令：
    - 开发环境: npm run dev
    - 生产环境: npm run start
    - 测试环境: npm run test

# 测试
目前有2种页面: 展示(home)和管理(admin)
- http://127.0.0.1:81/home
    - 展示页面中可以看到发出去的文章
- http://127.0.0.1:81/admin
    - 管理页面中可以添加账户
    - 添加文章
    - 文章管理

# 注意
- start.cmd文件目前只会运行生产环境

# begin
1. Open mongodb, test in cmd
     -mongod on
     -Test whether to open: mongo -u username -p pwd
2. Confirm that nodejs has been downloaded
3. Run in the home directory
     -npm i
4. Modify the configuration file:
     -There are three files under the config folder, namely: development, production, and test environment
         -Modify the user and pwd in the db object according to the situation above
5. Create user:
     -user.js in the model folder
     -Line 82-83, uncomment, and modify according to your needs
6. After the installation is complete, open cmd and enter the command:
     -Development environment: npm run dev
     -Production environment: npm run start
     -Test environment: npm run test

# Test
There are currently two types of pages: display (home) and management (admin)
-http://127.0.0.1:81/home
     -The posted article can be seen on the display page
-http://127.0.0.1:81/admin
     -Accounts can be added in the management page
     -Add article
     -Article management

# Note
-The start.cmd file currently only runs in the production environment