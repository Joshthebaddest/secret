const router = require('express').Router()
const secretController =  require('../controller/secretController') 
const { check } = require('express-validator');

router.route('/')
    .get(secretController.getSession)
    .post(
        [check("name").notEmpty().isAlpha('en-US', {ignore : ' '})], 
    secretController.createSession) 
router.route('/delete')
    .post(secretController.deleteSession)


router.route('/secret/:sessionId')
    .get(secretController.getSessionSecret)
    .post([check('message').notEmpty()], secretController.createSessionSecret)

module.exports = router