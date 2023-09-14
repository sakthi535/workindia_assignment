const jwt = require("jsonwebtoken");

const config = process.env;

const verifyAdmin = (req, res, next) => {

    const token =
        req.body.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;

        if (decoded.isAdmin == false) {
            throw Error("User doesn't have permission to access this resource")
        }
    } catch (err) {
        console.log(err)
        return res.status(403).json({ message: err.message });
    }
    return next();
};

module.exports = verifyAdmin;