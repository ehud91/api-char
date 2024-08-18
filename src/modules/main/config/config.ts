export default () => ({
    redis: {
        host: process.env.HOST_REDIS,
        port: process.env.PORT_REDIS,
        cache_ttl: parseInt(process.env.PORT_REDIS) || (120 * 1000)
    },
    rateLimiter: {
        allowMaxRequests: process.env.ALLOW_MAX_REQUESTS,
        timeWindowBetweenRequests: process.env.RATE_LIMITER_TIME_WINDOW,
    }
});