const { sysConst } = require("../const/systemDefault");

const getUserInfo=async(req,res,next)=>{
   
    try{
        const lang=req?.body?.region||req?.query?.region||req.header("region");
        if(!lang){
            req.lang=sysConst.DEFAULT_LANG;
            return next()
        }
        req.lang=sysConst.DEFAULT_LANG;


        const clientIp= req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        req.clientIp=clientIp;
        return next()
    }
    catch(err){
        console.log(err)
        req.lang=sysConst.DEFAULT_LANG;
        req.clientIp=sysConst.DEFAULT_IP;
        return next()
    }
}
module.exports=getUserInfo;