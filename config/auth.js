const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET; // SEIRocks!

module.exports = function(req, res, next) {
    const fullTokenString = req.get('Authorization') || req.query.token || req.body.token;
    // Example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
    if(fullTokenString) {
        const parsedTokenString = fullTokenString.replace('Bearer ', '');
        jwt.verify(parsedTokenString, SECRET, function(err, decodedToken) {
            if(err) {
                next(err);
            } else {
                req.user = decodedToken.user;
                next();
            }
        })
    } else {
        next('No token sent');
    }
};