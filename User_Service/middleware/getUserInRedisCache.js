const redis = require('redis');
const { userLoginDTO } = require('../dto/userLoginDTO');
const { userConst } = require('../const/userConst');
const client = redis.createClient();

const getUserInRedisCache=async(req,res,next)=>{
   
    try{
        const key = req.path;
        // Check if data is in cache
        client.get("user:"+req.token.userId, (err, data) => {
            if (err) {
                console.log(err);
                next()
            };
            if (data) {
                // Data found in cache, use it
                req.user=JSON.parse(data);
            } else {
                //if data does not exited , logout user from brower;
                const response=userLoginDTO.responseLogin;
                response.statusCode=userConst.SEESSION_EXPIRED._CODE
                response.message=userConst.SEESSION_EXPIRED[req.lang]
                return res.send(401,response);
            }
        });
    }
    catch(err){
        console.log(err)
        return next()
    }
}
module.exports=getUserInRedisCache;