export const verifyinvntary = (req, res, next) => {
    if (!req.user.isinvntryManager) {
        return res.status(403).json({ success: false, message: 'Access denied. Only isinvntryManager are allowed.' });
    }
    next();
};