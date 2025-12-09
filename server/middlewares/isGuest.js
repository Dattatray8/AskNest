import guestSearchLimiter from "./guestSearchLimiter.js";

const isGuest = async (req, res, next) => {
    try {
        if (!req.userId) {
            return guestSearchLimiter(req, res, next);
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Guest search limit error",
            error: error.message,
        });
    }
}

export default isGuest;