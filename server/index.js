const express = require('express');

let app = express();

app
    .use(require('morgan')('dev'))
    .use(require('cors')())
    .use(express.json({limit:'50mb'}))
;

app
    .use('/', require('./routes'))

    .use((req, res) => {
        res
            .status(404)
            .send('404: page not found')
        ;
    })
;

let port = process.env.EXPRESS_PORT || '7000';
let host = process.env.EXPRESS_HOST || 'localhost';
app.listen(port, host, () => {
    console.log(`Server started: http://${host}:${port}`);
});