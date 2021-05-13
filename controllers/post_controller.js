const Post = require('../models/post');
const Comment = require('../models/comment');

// Modifying code using async await functionality
module.exports.create = async function(req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        req.flash('success', 'Posted successfully');
        return res.redirect('back');

    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res) {

    try {

        let post = await Post.findById(req.params.id);
            if(post){
                // .id means converting object id into string as we are converting post user(i.e. object id) and User id(i.e also object id)
                if(post.user == req.user.id) {
                    post.remove();
                    
                    await Comment.deleteMany({post: req.params.id});
                    req.flash('success', 'Posted & associated Comments deteled!');
                    return res.redirect('back');
                } else{
                    req.flash('error', 'You can not delete this post');
                    return res.redirect('back');
                }
            }

    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
    
}