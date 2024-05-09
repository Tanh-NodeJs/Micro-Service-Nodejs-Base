const express=require("express");
const { userConst } = require("../const/userConst");
const router=express.Router();





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



module.exports=router