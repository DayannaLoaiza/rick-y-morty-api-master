let router = require('express').Router();

const service = require('../services/episodes');

router
    .get('/', async (req, res, next) => {
        let {
            page = ''
        } = req.query;

        let options = {
            page
        }

        let data = await service.getEpisodesAll(options);

        res
            .status(200)
            .json(data);
    })

    .get('/:id', async (req, res, next) => {
        const {
            id
        } = req.params;

        let data = await service.getEpisodeById(id);

        res
            .status(200)
            .json(data);
    })
;

module.exports = router;