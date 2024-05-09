const { userDataDTO } = require("./userDataDTO")

const userLoginDTO={
    responseLogin:{
        statusCode:null,
        message:null,
        data:{
            token:null,
            expriedToken:null,
            user:userDataDTO
        }
    }
}


module.exports={
    userLoginDTO
}