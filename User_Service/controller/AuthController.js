const { userConst } = require("../const/userConst");
const { userLoginDTO } = require("../dto/userLoginDTO");
const { userLogin } = require("../service/AuthService");
const tokenCreateFromUserLogin=require('../service/AuthService').tokenCreateFromUserLogin
const login = async (req, res) => {
    const lang=req.lang;
    try {
        //login Logic
        const reqUserName=req.body.username;
        const reqPassword=req.body.password;
        const responseLogin=userLoginDTO.responseLogin;
        const user=await userLogin(reqUserName,reqPassword);//data mock checklogin later
        if(user.data===null)
            {
                responseLogin.statusCode=userConst.WRONG_USERNAME_OR_PASSWORD._CODE;
                responseLogin.message=userConst.WRONG_USERNAME_OR_PASSWORD[lang];
                responseLogin.data=null;
                return res.send(responseLogin)
            }
        user.clientIp=req.clientIp
        const tokenData =await tokenCreateFromUserLogin(user);
        responseLogin.statusCode=userConst.LOGIN_SUCCESS._CODE;
        responseLogin.message=userConst.LOGIN_SUCCESS[lang];
        responseLogin.data.token.value=tokenData.token;
        responseLogin.data.token.expires=tokenData.expires;
        responseLogin.data.user.firstName=user.data.firstName;
        responseLogin.data.user.lastName=user.data.lastName;
        
        res.send(responseLogin);
    } catch (error) {
        console.log(error);
        res.status(400).send("Nghịch thế cu");
    }
    
}

module.exports = {
    login
}