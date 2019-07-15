const nameregex = /^(([^<>()\[\]\\.,;:\s"]+(\.[^<>()\[\]\\.,;:\s"]+)*)|(".+"))((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordregex = /^[a-zA-Z]\w{3,14}$/;
import userData from '../models/usersData';


const signInValidator = (req, res, next) => {
    try {
        req.body.email = req.body.email.trim();
        req.body.password = req.body.password.trim();
        if ((emailregex.test(req.body.email) || emailregex.test(req.body.email)) && passwordregex.test(req.body.password)) {
            next();
        } else {
            throw new Error();
        }
    } catch (err) {
        res.status(412).json({
            status: 412,
            error: 'Email or Password is Invalid',
        });
    }
};

const signUpValidator = (req, res, next) => {
    try {
        req.body.first_name = req.body.first_name.trim();
        req.body.last_name = req.body.last_name.trim();
        req.body.email = req.body.email.trim();
        req.body.password = req.body.password.trim();
        if (emailregex.test(req.body.email) && passwordregex.test(req.body.password) && nameregex.test(req.body.first_name) && nameregex.test(req.body.last_name)) {
            next();
        } else {
            throw new Error();
        }
    } catch (err) {
        res.status(412).json({
            status: 412,
            error: 'Your Details are not valid',
        });
    }
};
 
const adminValidator = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split('Bearer')[1].trim();
        userData.getSingleUserByToken(token).then((result) => {
            const user = result.rows;
            if (user.length > 0) {
                if (user[0].is_admin === true) {
                    next();
                } else {
                    res.status(409).json({
                        status: 409,
                        message: 'User not an admin',    
                    });
                }
            } else {
                res.status(400).json({
                    status: 400,
                    message: 'Invalid token',
                });
            }
        });
    } catch {
        res.status(400).json({
            status: 400,
            message: 'invalid token',
        });
    }
}
const userValidator = {
    signInValidator,
    signUpValidator,
};

export default userValidator;