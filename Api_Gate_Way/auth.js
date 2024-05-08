const { createProxyMiddleware } = require('http-proxy-middleware');
const secret =process.env.jwtSecret;
const verifyToken =async(req,res,next)=> {
    const token =req.token
    if(!token)
        return res.status(401).send({
            token: false,
            valid: false,
            status:"MISSING_TOKEN"
        });

    // Verify the token using jwt.verify method
    const decode = jwt.verify(token, secret);
    if(!decode)
        return res.status(401).send({
            token: false,
            valid: false,
            status:"MISSING_TOKEN"
        });
        const seconds = 1000;
        const d = new Date();
        const t= d.getTime();
        if(decodedToken.exp< Math.round(t / seconds))
            return res.status(401).send({
                token: true,
                valid: false,
                status:"EXPIRED_TOKEN"
            });
        next();
}

const setupAuth = (app, routes) => {

    routes.forEach(r => {
        if (r.auth) {
            const target=  r.proxy.target;
            const proxyOptions ={
                target,
                changeOrigin: true,
                pathRewrite: {
                  [`^${r.url}`]: "",
                },
            }
            app.use(r.url, verifyToken, createProxyMiddleware(proxyOptions));
        }
        else {
            const target= "https://www.freecodecamp.org";
            const proxyOptions ={
                target:target,
                changeOrigin: true
            }
            app.use(r.url, createProxyMiddleware(proxyOptions));
        }
    });
}

exports.setupAuth = setupAuth
