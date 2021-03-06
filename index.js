const express = require('express')
const app = express();
const ejs = require('ejs');
const  mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');


//controller
const newPostcontroller = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const validateMiddleWare = require ('./middleware/validationMiddleware');
const newUserController = require('./controllers/newuser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginuser');
const logoutController = require('./controllers/logout');

// Add new feature
const myPostController = require ('./controllers/myPostControllers');
const editPostController = require ('./controllers/editPostController');
const updatePostController = require ('./controllers/updatePostController');
const deletePostController = require ('./controllers/deletePostController');
//Middleware 
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
// File Upload Package
const fileupload = require('express-fileupload')


//customidleware
//mongodb+srv://yoyopop009:1234@cluster0.mw34a.mongodb.net/my_database
mongoose.connect('mongodb://localhost:27017/my_database', { useNewUrlParser: true});
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(fileupload());
app.use('/post/store', validateMiddleWare );
app.use(expressSession({
  secret: 'nodejsblog',
  resave: true,
  saveUninitialized: true
 }))
app.use(flash());

 global.loggedIn = null;

 app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
 })

app.get('/', homeController);
//register
app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController);
//Login user
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController);
//Update user
app.post('/posts/update',authMiddleware, updatePostController);
//delete user
app.get('/posts/delete/:id',authMiddleware, deletePostController);
//LogOUT user
app.get('/auth/logout', logoutController);
//View my own post
app.get('/posts/mypost', authMiddleware, myPostController);
//Edit Post
app.get('/posts/edit/:id', authMiddleware, editPostController);

app.get('/post/:id',getPostController);
// NEW POST
app.get('/posts/new',authMiddleware, newPostcontroller);//????????? userr???????????????login??????????????????

//create data
app.post('/post/store',authMiddleware, storePostController);
//create user
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController);
//create user
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController);

app.use((req, res) => res.render('notfound'));

let port =process.env.PORT;
if (port == null || port == "") {
   port = 4000;
}

app.listen(port, () => {
   console.log('App listening on part 4000') 
})