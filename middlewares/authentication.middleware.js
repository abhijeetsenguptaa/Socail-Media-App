require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');


const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            jsonwebtoken.verify(token, process.env.secret_key, async (err, decode) => {
                if (decode) {
                    req.body.userID = decode["user-id"];
                    next()
                } else {
                    res.status(404).send({
                        status: false,
                        msg: "Please Log In."
                    })
                }
            })
        } else {
            res.status(404).send({
                status: false,
                msg: "Protected Route. You need to Login."
            })
        }
    } catch {
        res.status(404).send({
            status: false,
            msg: "Error in the Authentication"
        })
    }
}


module.exports = { authentication };