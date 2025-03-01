export const verifydocter = (req, res, next) => {
    if (!req.user.isDoctor) {
        return res.status(403).json({ success: false, message: 'Access denied. Only docter are allowed.' });
    }
    next();
};
