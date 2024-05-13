const { sysConstDefault } = require("../const/systemDefault");

const getUserInfo=async(req,res,next)=>{
   
    try{
        const lang=req?.body?.region||req?.query?.region||req.header("region");
        req.lang=lang?lang:sysConstDefault.DEFAULT_LANG;
        const clientIp= req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        req.clientIp=clientIp?clientIp:sysConstDefault.DEFAULT_IP;
        return next()
    }
    catch(err){
        console.log(err)
        req.lang=sysConstDefault.DEFAULT_LANG;
        req.clientIp=sysConstDefault.DEFAULT_IP;
        return next()
    }
}
module.exports=getUserInfo;