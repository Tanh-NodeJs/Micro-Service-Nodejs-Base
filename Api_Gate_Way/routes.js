const ROUTES = [
    {
        url: '/user/login',
        auth: false,
        proxy: {
            target: "http://localhost:1212/api/user/login",
            changeOrigin: true
        }
    }
]

exports.ROUTES = ROUTES;