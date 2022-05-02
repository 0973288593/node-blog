const BlogPost = require('../models/BlogPost');
//ในบรรทัดที่ 4 เป็นการเข้าถึงการโพสไปเก็บที่ตัวแปล blogposts
module.exports = async (req, res) => {
    const blogposts = await BlogPost.findById(req.params.id);
    if (req.session.userId) {
        return res.render('editpost', {
            blogposts
        });
    }
    res.redirect('/auth/login');
}