const Post = require('../models/post');
const User = require('../models/users');


module.exports.home = async function(req, res) {
    try {
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users,
    });
    } catch (error) {
        console.log('Error', error);
        return;
    }
    
}

//Commenting to introduce Async and await functionality 
// module.exports.home = function(req, res) {

//     // console.log(req.cookies)// accessing cookies
//     // res.cookie('user_id', 25);

//     //Helpful to find the post but not user we have mongoose populate function for this which we will use
//     // Post.find({}, function(err, posts){
//     //     return res.render('home',{
//     //         title: "Codeial | Home",
//     //         posts: posts,
//     //     })
//     // }); 

//     // to populate the user fof each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path:'user'
//         }
//     })
//     .exec(function(err, posts){
//         User.find({}, function(err, users){
//             return res.render('home',{
//                 title: "Codeial | Home",
//                 posts: posts,
//                 all_users: users,
//             })
//         })

        
//     });


// };