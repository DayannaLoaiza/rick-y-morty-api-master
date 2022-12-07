let router = require('express').Router();

router
    .all('*', (req, res, next) => {
        const {
            token
        } = req.headers;

        if( false // TESTING !!!
            // !token || token !== '#TOKEN12345=='
        ){
            res
                .status(401)
                .send('401: not authorized')
                .end()
            ;
        } else {
            next();
        }
    })
    
    .use('/characters', require('./characters'))
    .use('/locations', require('./locations'))
    .use('/episodes', require('./episodes'))

    .use('/crud', require('./crud'))
;

module.exports = router;