const jwt = require('jsonwebtoken');
const { creatError } = require('./error');


exports.verifyToken =  (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return next(creatError(401, "You are not authenticated!"))
    
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err)
        return next(creatError(403, "Token is not valid!"))
        req.user = user
        next()
    })
}


