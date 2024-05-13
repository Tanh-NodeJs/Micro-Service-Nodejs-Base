
/*set up librairy*/
require('dotenv').config()
const server = require('./server')
const express = server.express;
const app = server.app;
const appServer = server.server;
//paste body request from frontend
let bodyParser = require('body-parser');
//upload file
const fileUpload = require('express-fileupload');
//swagger
// const swaggerUi = require('swagger-ui-express');
//read swagger from yaml
// const YAML = require('yamljs');
//read yaml file 
// const swaggerSpec = YAML.load('./swagger/swagger.yaml');

    /*end set up librairy*/

/*server*/

//use and config session
// app.use(sessions({
//     //key for session
//     secret: process.env.SESSION_KEY,
//     //allow session to save if it Uninitialized
//     saveUninitialized:true,
//     // life time session 
//     cookie: { maxAge: oneDay, secure: false, httpOnly: false,sameSite: false },
//     // resave the token if it exit
//     resave: false,



// }));

//connect to database
// require('./Dao/Connection.js');
// require('./Dao/java.js');
//use swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
//     explorer: true
// }));
//set up cors


//paste body
app.use(bodyParser.json());
//paste request url
app.use(bodyParser.urlencoded({ extended: true }));
//set limit file size upload
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

/*end server*/

/*router*/
// import router
const authRouter = require('./router/AuthRouter');
const configRouter = require('./router/configRouter');
const getUserLang = require('./middleware/requestMiddlaware');

app.use(express.static('stogare'));
app.use('/stogare', express.static('stogare'));


// app.use('/api/momo',momoRouter);
// app.use('/',(req,res)=>{
//     res.send("hello world")
// });
app.all('*', getUserLang);
    
app.use('/api/user',authRouter);
app.use('/',configRouter);




    /*end router*/

//1s
// schedule.scheduleJob('*/1 * * * * *', () => { 


// }) 

// schedule.scheduleJob('0 0 * * *', () => {

//     fsExtra.emptyDirSync('storage/temp/call')
//         // console.log("running a task every midnight");
// })


appServer.listen(process.env.PORT??1212, () => {
    console.log("Đang mở api docs!");
    console.log("Server đang chạy tại 127.0.0.1:"+process.env.PORT??1212);

});




//                      _oo0oo_
//                     o8888888o
//                     88" . "88
//                     (| -_- |)
//                     0\  =  /0
//                   ___/`---'\___
//                 .' \\|     |# '.
//                / \\|||  :  |||# \
//               / _||||| -:- |||||- \
//              |   | \\\  -  #/ |   |
//              | \_|  ''\---/''  |_/ |
//              \  .-\__  '-'  ___/-. /
//            ___'. .'  /--.--\  `. .'___
//         ."" '<  `.___\_<|>_/___.' >' "".
//        | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//        \  \ `_.   \_ __\ /__ _/   .-` /  /
//    =====`-.____`.___ \_____/___.-`___.-'=====
//                      `=---='
//
//
//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//      please do not BUG