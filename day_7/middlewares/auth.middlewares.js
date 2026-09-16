const jwt = require("jsonwebtoken");

async function identify_user(req, res, next) {
    
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        Message: "token not provided",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        Message: "token invalid",
      });
    }

    res.status(200).json({
        Message:""
    })

    req.user = decoded;
    next()
}

module.exports = identify_user;
