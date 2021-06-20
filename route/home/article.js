const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
const { CommentNoUser } = require('../../model/comment-nouser');

module.exports = async (req, res, next) => {
        // res.send('Welcome to the note details page')
        const id = req.query.id;
        // req.session.id = id;
        if(!id) {
            return res.redirect('/home/');
        }

        let article = await Article.findOne({_id: id}).populate('author');

        // Query the comment information corresponding to the current note
        let comments = await Comment.find({aid: id}).populate('uid');

        let commentnousers = await CommentNoUser.find({aid: id});

        // return res.send(commentnousers);
            // res.send(article);
        return res.render('home/article.art', {
            article,
            comments,
            commentnousers
        });
}