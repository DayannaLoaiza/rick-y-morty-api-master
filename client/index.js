const express = require('express');
const path = require('path');

let app = express();

app
    .use(require('morgan')('dev'))
;
    
app
    .use('/', require('./routes'))
    .use('/static', express.static('static'))

    .use((req, res) => {
        res
            .status(404)
            .send('404: page not found')
        ;
    })
;

let port = process.env.EXPRESS_PORT || '3000';
let host = process.env.EXPRESS_HOST || 'localhost';
app.listen(port, host, () => {
    console.log(`Server started: http://${host}:${port}`);
});