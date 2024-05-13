const { createProxyMiddleware } = require('http-proxy-middleware');
const { tokenDTO } = require('./dto/tokenDTO');
const secret =process.env.jwtSecret;
const verifyToken =async(req,res,next)=> {
    const token =req.body?.token||req.query?.token||req.header["x-access-token"];
    if(!token)
        return res.status(401).send({
            token: false,
            valid: false,
            status:tokenDTO.MISSING_TOKEN
        });

    // Verify the token using jwt.verify method
    const decode = jwt.verify(token, secret);
    if(!decode)
        return res.status(401).send({
            token: false,
            valid: false,
            status:tokenDTO.MISSING_TOKEN
        });
        const seconds = 1000;
        const d = new Date();
        const t= d.getTime();
        if(decodedToken.exp< Math.round(t / seconds))
            return res.status(401).send({
                token: true,
                valid: false,
                status:tokenDTO.EXPIRED_TOKEN
            });
        req.tokenDecoed=decodedToken;
        next();
}

const verifySuperAdmin =async(req,res,next)=> {
    const decodedToken=req.tokenDecoed;
    if(decodedToken.role.includes(roleDTO["SUPER_ADMIN"]))
        return res.status(401).send({
            token: true,
            valid: false,
            status:tokenDTO.INVALID_ROLE
        });
    next();
}

const setupAuth = (app, routes) => {

    routes.forEach(r => {
       
          
        if (r.auth) {
            app.use(r.url, verifyToken, createProxyMiddleware(r.proxy));
        }
        else if(r.super_admin_auth)
            {
                app.use(r.url, verifyToken,verifySuperAdmin,createProxyMiddleware(r.proxy));
            }
        else {
            app.use(r.url, createProxyMiddleware(r.proxy));
        }
    });
}

exports.setupAuth = setupAuth
