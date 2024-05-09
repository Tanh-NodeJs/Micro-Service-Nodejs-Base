const { userDataDTO } = require("./userDataDTO")

const userLoginDTO={
    responseLogin:{
        statusCode:null,
        message:null,
        data:{
            token:{
                value:null,
                expires:null
            },
            user:userDataDTO
        }
    }
}


module.exports={
    userLoginDTO
}