const {rateLimit} = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15*60*1000,
    limit:100,
    standardHeaders:true,
    legacyHeaders:false,
    message:"Too many requests, try again later"
})

const loginLimiter = rateLimit({
    windowMs: 15*60*1000,
    limit:5,
    message: "Too many login attempts. Please try again in 15 minutes.",
    standardHeaders:true,
    legacyHeaders:false
})

module.exports={limiter,loginLimiter}