const _JWT_SECRET=process.env.jwtSecret
const _HASH_SECRET=process.env.passwordHashKey
const jwt = require('jsonwebtoken');
const { userDataDTO } = require('../dto/userDataDTO');
const { userConst } = require('../const/userConst');
const redis = require('redis');
const client_redis = redis.createClient();
const bcrypt=require("bcrypt-nodejs")
const { flatten, unflatten } = require('safe-flat');
const { sysConst } = require('../const/systemConst');
const e = require('express');
const { head } = require('../router/AuthRouter');
const tokenCreateFromUserLogin= async (data)=>{
    const user =data.data
    var DURATION = 3600*8;
    var token = jwt.sign({ userId: user.userId,  ip: user.clientIp , passWord: user.passWord }, _JWT_SECRET, {expiresIn: DURATION});
    var expiration = new Date();                
    expiration.setSeconds(expiration.getSeconds() + DURATION);
    return {token,expiration}
}




const userLogin= async (username,password)=>{
    const user =userDataDTO;
    //todo : select from username get password and dehash it
    //https://github.com/shaneMangudi/bcrypt-nodejs

    //todo : remove this later
    // {id:1,firstName:'foo',lastName:'bar'}
    user.userId=1;
    user.firstName="foo";
    user.lastName="bar";
    user.passWord=await bcrypt.hashSync("passs");
    // console.log(await bcrypt.compareSync("passs","$2a$10$UkJqqsxKBLsvjheg2cwu7uGv51sTqSPcjLpGTbeFMfBVyBgdkY2Vy"))
    //end to remove
    const result={
        status:null,
        data:user
    }
    
    //todo: login user
    // const user={} do login here
    if(user.userId==null)//wrong username or password
        {
            result.status=userConst.WRONG_USERNAME_OR_PASSWORD._CODE;
            return result;
        }
    if(user.locked)//locked account
        {
            result.status=userConst.BLOCKED_ACCOUNT._CODE;
            return result;
        }
    try 
    {
      
        await client_redis.connect();
        await client_redis.hSet("user_"+user.userId,flatten(user))
        // console.log(JSON.parse(await client_redis.get("user_1"))) 
        client_redis.disconnect()  
        result.status=userConst.LOGIN_SUCCESS._CODE;
        result.data=user;
    } catch (error) {
        client_redis.disconnect()  
        console.log(error)
        result.status=sysConst.SYSTEM_ERROR_500._CODE;
        result.data=null

    }
    return result;
}
module.exports={tokenCreateFromUserLogin,userLogin}