const express=require("express");
const { userConst } = require("../const/userConst");
const router=express.Router();


router.get('/config', (req, res) => {
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

    res.send(config);
});

module.exports=router
