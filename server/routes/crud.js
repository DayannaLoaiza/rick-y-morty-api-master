let router = require('express').Router();

const service = require('../services/crud');

router
    .get('/migrate/:entity', async (req, res, next) => {
        let {
            entity
        } = req.params;

        service.migrateEntity(entity);
        
        res
            .status(200)
            .send(`200: ${entity} migrated`);
    })

    .get('/:entity', async (req, res, next) => {
        const {
            page = ''
        } = req.query;
        
        const {
            entity = ''
        } = req.params;

        let options = {
            entity,
            page
        }

        let data = await service.getEntitiesAll(options);

        res
            .status(200)
            .json(data);
    })

    .get('/:entity/:id', async (req, res, next) => {
        const {
            entity,
            id
        } = req.params;

        let data = await service.getEntityById(entity, id);

        res
            .status(200)
            .json(data);
    })

    .post('/:entity', async (req, res, next) => {
        const {
            entity
        } = req.params;

        const data = req.body;

        console.log({data});
        
        let results = await service.upsertEntity(entity, {data})

        res
            .status(200)
            .json({
                error: false,
                msg: 'Registro creado'
            })
    })

    .patch('/:entity', async (req, res, next) => {
        const {
            entity
        } = req.params;

        const data = req.body;

        console.log({data});
        
        let results = await service.upsertEntity(entity, {data})

        res
            .status(200)
            .json({
                error: false,
                msg: 'Registro creado'
            })
    })

    .delete('/:entity', async (req, res, next) => {
        const {
            entity
        } = req.params;

        const {
            id
        } = req.query;

        let rs = await service.deleteEntity(entity, id);
        console.log('DELETE: ', {rs});

        res
            .status(200)
            .json({
                error: false,
                msg: 'Registro eliminado'
            })
    })
;

module.exports = router;