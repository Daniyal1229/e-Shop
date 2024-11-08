
const checkAdminOrEmployee = (req, res, next) => {
    if (req.user.role === "admin" || req.user.role === "employee") {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export  default checkAdminOrEmployee;