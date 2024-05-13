const express=require("express");
const { userConst } = require("../const/userConst");
const router=express.Router();
const redis = require('redis');
const { requestDTO } = require("../dto/requestDTO");
const client_redis = redis.createClient();
const KEY_CONFIG_NAME="USER_SERVICE_CONFIG_USER_LOGIN_STATUS_CODE"
router.get('/config',async (req, res) => {
    await client_redis.connect();
    const exited_config=await client_redis.exists(KEY_CONFIG_NAME);
    if(exited_config){
        const config_return=await client_redis.get(KEY_CONFIG_NAME);
        client_redis.disconnect()
        return res.send(JSON.parse(config_return));
    }
    const config = {
        AuthConfig: {}
    };
    Object.entries(userConst).forEach(([key, value]) => {
        Object.entries(value).forEach(([keyLOGIN, valueLogin]) => {
            if (keyLOGIN === '_CODE') {
                config.AuthConfig[`${key}${keyLOGIN}`] = valueLogin;
            }
        });
    });
    await client_redis.set(KEY_CONFIG_NAME,JSON.stringify(config))
    client_redis.disconnect()
    res.send(config);
});


router.get('/reset-config',async (req, res) => {
    await client_redis.connect();
    await client_redis.del(KEY_CONFIG_NAME);
    client_redis.disconnect();
    res.send(requestDTO.STATUS_CODES_OK);
});

module.exports=router
