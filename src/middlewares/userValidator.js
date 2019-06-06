const nameregex = /^(([^<>()\[\]\\.,;:\s"]+(\.[^<>()\[\]\\.,;:\s"]+)*)|(".+"))((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordregex = /^[a-zA-Z]\w{3,14}$/;

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

const userValidator = {
    signInValidator,
    signUpValidator,
};

export default userValidator;