const ROUTES = [
    {
        url: '/user/login',
        auth: false,
        proxy: {
            target: process.env.API_USER_LOGIN,
            changeOrigin: true
        }
    }
]

exports.ROUTES = ROUTES;