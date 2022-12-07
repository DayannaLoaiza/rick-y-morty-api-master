let router = require('express').Router();

const service = require('../services/characters');

router
    .get('/', async (req, res, next) => {
        let {
            page = ''
        } = req.query;

        let options = {
            page
        }

        let data = await service.getCharactersAll(options);

        res
            .status(200)
            .json(data);
    })

    .get('/:id', async (req, res, next) => {
        const {
            id
        } = req.params;

        let data = await service.getCharacterById(id);

        res
            .status(200)
            .json(data);
    })
;

module.exports = router;