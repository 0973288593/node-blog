const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({ userid: req.session.userId }).populate('userid');//populateเอาไว้เเสดงชื่อusername
    //ifมีให้renderหน้าmypost และ นำค่าของblogpostsมาแสดงในบรรทัดที่8   ค่า blogposts ได้จากการคิวรี่ไฟล์ BlogPost ในบรรทัดที่ 1 มาใส่ในตัวแปร blogposts ในบรรทัดที่ 4
    if (req.session.userId) {
        return res.render('mypost', {
            blogposts    
        });
    }
    res.redirect('/auth/login');
    //ถ้าไม่ได้มีการล็อคอินเข้ามา สั่งให้ กลับไปที่หน้า login
}
