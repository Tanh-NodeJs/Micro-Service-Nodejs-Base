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



router.get('/config',(req,res)=>{
    const config={
        AuthConfig:{

        }
    }
    for (const [key, value] of Object.entries(userConst)) {
        console.log(value)
        for (const [keyLOGIN, valueLogin] of Object.entries(value)) {
            if(keyLOGIN==='_CODE')
                {
                    config.AuthConfig[key+keyLOGIN]=valueLogin
                }
            
        }
    }
    res.send(config)
})
router.get('/config', (req, res) => {
    const config = Object.entries(userConst).reduce((acc, [key, value]) => {
        Object.entries(value).forEach(([keyLOGIN, valueLogin]) => {
            if (keyLOGIN === '_CODE') {
                acc.AuthConfig[`${key}${keyLOGIN}`] = valueLogin;
            }
        });
        return acc;
    }, { AuthConfig: {} });

    res.send(config);
});



module.exports=router
