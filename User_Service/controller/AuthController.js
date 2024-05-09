const { userConst } = require("../const/userConst");
const { userLoginDTO } = require("../dto/userLoginDTO");
const tokenCreateFromUserLogin=require('../service/AuthService')
const login = async (req, res) => {
    const lang=req.lang;
    try {
        //login Logic
        //todo:check login 
        const responseLogin=userLoginDTO.responseLogin;
        const user={id:1,firstName:'foo',lastName:'bar'}//data mock checklogin later
        if(!user)
            {
                responseLogin.statusCode=userConst.WRONG_USERNAME_OR_PASSWORD._CODE;
                responseLogin.message=userConst.WRONG_USERNAME_OR_PASSWORD[lang];
        
                return res.send(responseLogin)
            }
            
        const token =await tokenCreateFromUserLogin(user);
        responseLogin.statusCode=userConst.LOGIN_SUCCESS._CODE;
        responseLogin.message=userConst.LOGIN_SUCCESS[lang];
        responseLogin.data.token=token;
        responseLogin.data.user.firstName=user.firstName;
        responseLogin.data.user.lastName=user.lastName;
        
        
        res.send(responseLogin);
    } catch (error) {
        console.log(error);
        res.status(400).send("Nghịch thế cu");
    }
    

}

module.exports = {
    login
}