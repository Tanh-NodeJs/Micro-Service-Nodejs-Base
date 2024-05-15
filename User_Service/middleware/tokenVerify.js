const { createProxyMiddleware } = require('http-proxy-middleware');
const { tokenConst } = require('../../Api_Gate_Way/const/tokenConst');
const secret =process.env.jwtSecret;
const verifyToken =async(req,res,next)=> {
    const token =req.body?.token||req.query?.token||req.header["x-access-token"];
    if(!token)
        return res.status(401).send({
            token: false,
            valid: false,
            status:tokenConst.MISSING_TOKEN
        });

    // Verify the token using jwt.verify method
    const decode = jwt.verify(token, secret);
    if(!decode)
        return res.status(401).send({
            token: false,
            valid: false,
            status:tokenConst.MISSING_TOKEN
        });

    const seconds = 1000;
    const d = new Date();
    const t= d.getTime();
    if(decodedToken.exp< Math.round(t / seconds))
        return res.status(401).send({
            token: true,
            valid: false,
            status:tokenConst.EXPIRED_TOKEN
        });
    req.decodedToken=decode;
    req.token=token;
    next();
}


module.exports = verifyToken
