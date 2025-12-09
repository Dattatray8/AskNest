import rateLimit from "express-rate-limit";

const guestSearchLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests, please try again later.",
    }
})

export default guestSearchLimiter;