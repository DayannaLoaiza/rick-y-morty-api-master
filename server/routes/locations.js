let router = require('express').Router();

const service = require('../services/locations');

router
    .get('/', async (req, res, next) => {
        let {
            page = ''
        } = req.query;

        let options = {
            page
        }

        let data = await service.getLocationsAll(options);

        res
            .status(200)
            .json(data);
    })

    .get('/:id', async (req, res, next) => {
        const {
            id
        } = req.params;

        let data = await service.getLocationById(id);

        res
            .status(200)
            .json(data);
    })
;

module.exports = router;