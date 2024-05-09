const { sysConst } = require("../const/systemDefault");

const getUserLang=async(req,res,next)=>{
   
    try{
        const lang=req?.body?.region||req?.query?.region||req.header("region");
        if(!lang){
            req.lang=sysConst.DEFAULT_LANG;
            return next()
        }
        req.lang=sysConst.DEFAULT_LANG;
        return next()
    }
    catch(err){
        console.log(err)
        req.lang=sysConst.DEFAULT_LANG;
        return next()
    }
}
module.exports=getUserLang;