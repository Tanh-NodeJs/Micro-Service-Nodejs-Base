const ROUTES = [
    {
        url: '/user/login',
        auth: false,
        proxy: {
            target: process.env.API_USER_LOGIN,
            changeOrigin: true
        }
    },
    {
        url: '/userService/config',
        auth: false,
        proxy: {
            target: process.env.API_USER_LOGIN_CONFIG,
            changeOrigin: true
        }
    }
]

exports.ROUTES = ROUTES;