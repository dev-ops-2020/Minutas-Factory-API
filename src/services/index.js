const jwt = require('jwt-simple');
const moment = require('moment')
require('dotenv').config();

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }
   return jwt.encode(payload, process.env.JWT_KEY);
}

function decodeToken(token) {
    const decode = new Promise((resolve,reject) => {
        try {
            const payload = jwt.decode(token, process.env.JWT_KEY)
            if(payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'Expired token'
                })
            }            
            resolve(payload.sub)
        } catch (err) {
            reject({
                status: 200,
                message: 'Invalid token'
            })
        }
    })
    return decode
}

module.exports = {
    createToken,
    decodeToken
}