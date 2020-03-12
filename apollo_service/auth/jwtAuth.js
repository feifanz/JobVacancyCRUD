const jwt = require('jsonwebtoken');

class JwtAuth {

    static generateToken(data) {
        return jwt.sign(data,'secretkey', { expiresIn: '1h'})
    }

    static verify(token){
        return jwt.verify(token, 'secretkey')
    }

}

module.exports = JwtAuth;