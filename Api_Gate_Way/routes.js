const ROUTES = [
    {
        url: '/free',
        auth: false,
        proxy: {
            target: "https://www.google.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/free`]: '',
            },
        }
    },
    {
        url: '/premium',
        auth: true,
        proxy: {
            target: "https://www.google.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/premium`]: '',
            },
        }
    }
]

exports.ROUTES = ROUTES;

// For the sake of simplicity, we have identified two routes, one that represents the endpoint of a free (/free) service and one representing a premium (/premium) service. Each service can have the following properties:

// url — URL path to match with incoming requests. This can be any path that is supported by Express. This means it can also contain wildcards to match multiple paths.
// auth — Boolean representing if a user needs to be authenticated for accessing this endpoint.
// creditCheck — Boolean indicating if a credit check needs to be executed for this request.
// rateLimit — Configuration for applying rate limiting to the service.
// proxy — Proxy configuration containing information about the target to which the request should be redirected