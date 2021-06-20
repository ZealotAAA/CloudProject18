const guard = (req, res, next) => {
    if(!req.session.id) {
        // return res.send('zhe1');
        return res.redirect('/home/');
    } else {
        // return res.send('zhe1');
        if(req.session.role == 'normal' && req.url == 'logout') {
            return res.redirect('/admin/login');
        }

        return next();
    }
}

module.exports = guard;