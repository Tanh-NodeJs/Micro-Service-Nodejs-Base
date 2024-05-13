const express = require("express");
const { userConst } = require("../const/userConst");
const router = express.Router();
const redis = require('redis');
const { requestConst } = require("../const/requestConst");
const client_redis = redis.createClient();
const KEY_CONFIG_NAME = "USER_SERVICE_CONFIG_USER_LOGIN_STATUS_CODE";
const { flatten, unflatten } = require('safe-flat')
router.get('/config', async (req, res) => {
  try {
    await client_redis.connect();

    const configExists = await client_redis.exists(KEY_CONFIG_NAME);

    if (configExists) {
      const config = await client_redis.hGetAll(KEY_CONFIG_NAME);

      client_redis.disconnect();
      return res.send(unflatten(config));
    }

    const config = {
      AuthConfig: {},
    };

    Object.entries(userConst).forEach(([key, value]) => {
      Object.entries(value).forEach(([keyLOGIN, valueLogin]) => {
        if (keyLOGIN === '_CODE') {
          config.AuthConfig[`${key}${keyLOGIN}`] = valueLogin;
        }
      });
    });
    await client_redis.hSet(KEY_CONFIG_NAME, flatten(config));
    client_redis.disconnect();
    res.send(config);
  } catch (error) {
    console.error("Error fetching or setting configuration:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.get('/reset-config',async (req, res) => {
    await client_redis.connect();
    await client_redis.del(KEY_CONFIG_NAME);
    client_redis.disconnect();
    res.send(requestConst.STATUS_CODES_OK);
});
module.exports=router