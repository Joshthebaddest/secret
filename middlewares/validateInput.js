const { check, validationResult } = require('express-validator');

const validateMessage = ( req, res, next ) => {
    const errors = validationResult(req);
    [check('message').notEmpty()]
    if(!errors.isEmpty()){
        const message = "message field can't be empty"
        const name = user[0].name;
        res.render('message', {name, home, message});
    }
}