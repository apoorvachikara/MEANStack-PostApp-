const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'string_to_make_the_JWT_token_stronger');
        next();
    }
    catch (error) {
        res.status(401).json({
            messgae: " Authentication failed"
        })
    }

};