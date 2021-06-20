const { User } = require('../../model/user');

module.exports = async (req, res) => {
    const deleId = req.query.id;
    // return res.send(deleId);
    await User.findOneAndDelete({_id: deleId});
    return res.redirect('/admin/user');

}