const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            });
            post.comments.push(comment);
            post.save();
            req.flash('success', 'Comment posted!');
            return res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }
}

module.exports.destroy = async function(req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();

            let post = Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            req.flash('success', 'Comments deteled!');
            return res. redirect('back');
        } else {
            req.flash('error', 'You can not delete this comment!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }
}

// Introducing new async await function
// module.exports.create = function(req, res) {
//     Post.findById(req.body.post, function(err, post){

//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 user: req.user._id,
//                 post: req.body.post
                
                
//             }, function(err, comment){
//                 post.comments.push(comment);
//                 post.save();
//                 res.redirect('/');
//             });
//         }
//     } )
// }

// module.exports.destroy = function(req, res) {
    
//     Comment.findById(req.params.id, function(err, comment){
        
//             if(comment.user == req.user.id){
//                 let postId = comment.post;
//                 comment.remove();

//                 Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id }}, function(err, post){
//                     return res.redirect('back');
//                 })
//             } else {
//                 return res.redirect('back');
//             }
//     });

// }