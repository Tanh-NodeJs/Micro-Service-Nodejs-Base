const ROUTES = [
    {
        url: '/user/login',
        auth: false,
        super_admin_auth:false,
        proxy: {
            target: process.env.API_USER_LOGIN,
            changeOrigin: true
        }
    },
    {
        url: '/userService/config',
        auth: false,
        super_admin_auth:false,
        proxy: {
            target: process.env.API_USER_LOGIN_CONFIG,
            changeOrigin: true
        }
    },
    {
        url: '/userService/rs-config',
        auth: false,
        super_admin_auth:true,
        proxy: {
            target: process.env.API_USER_LOGIN_RESET_CONFIG,
            changeOrigin: true
        }
    }
]

exports.ROUTES = ROUTES;