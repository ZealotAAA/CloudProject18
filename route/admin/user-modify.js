const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
    const { username, email, role, state, password } = req.body;
    const id = req.query.id;

    // check user id
    let user = await User.findOne({_id: id});

   // Query whether the user exists according to the email address
    let mail = await User.findOne({email: req.body.email});
    if (user.email != email){
        if (mail) {
            return next(JSON.stringify({path:'/admin/user-edit', message: 'Email address is already taken', id: id}));
        }
    }

    //Determine the identity of the current user
     // when root user
    let root = req.app.locals.userInfo.root;
    let roleR = req.app.locals.userInfo.role;
    let stateR = req.app.locals.userInfo.state;
    // {"state":0,"root":0,"_id":"5ef1a9f47a275c8298842f54","username":"root","email":"root@qq.com","password":"$2a$10$ttUtF9DZ.4u4XUU/2HHVyeemcQ0WVrmXXow4kZn5EKiaG3ruyS2p.","role":"root","__v":0}
    // return res.send(req.app.locals.userInfo)
    if(root == 0 && roleR == 'root' && stateR == 0) {
        await User.updateOne({_id: id}, {
            username: username,
            email: email,
            role: role,
            state: state 
         });
 
         return res.redirect('/admin/user');
    }

    //Non-root user
     // Compare password
    const isValid = await bcrypt.compare(password, user.password);

    if(isValid) {

        await User.updateOne({_id: id}, {
           username: username,
           email: email,
           role: role,
           state: state 
        });

        return res.redirect('/admin/user');
        
    }else {
        let obj = {path: '/admin/user-edit', message: 'Password comparison failed, user information cannot be modified', id: id}
        return next(JSON.stringify(obj));
    }

}