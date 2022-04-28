const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

// BlogPost.create ({
//     title:'This is post 1',
//     body:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has'
// }, (error, blogpost) => {
//     console.log(error, blogpost);
// })

let id = "622468a429b81bb14dce64a5"
BlogPost.findByIdAndDelete(id , (error, blogpost) => {
    console.log(error, blogpost)
})