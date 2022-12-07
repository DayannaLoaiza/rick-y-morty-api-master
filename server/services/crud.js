const path   = require('path');
const sqlite = require('sqlite3');
const {open} = require('sqlite');

const fetch  = require('node-fetch');
const { maxHeaderSize } = require('http');

const knex = require('./knex');

require('dotenv').config();

const apiBaseURL = process.env.API_BASE_URL || 'http://localhost' 

module.exports = {
    migrateEntity,
    getEntitiesAll,
    getEntityById,
    upsertEntity,
    deleteEntity
}

async function getEntitiesAll(options){
    const {
        entity = '',
        page = 1
    } = options;

    let db_entity = entity;

    let sqlInfo = `SELECT COUNT(*) as total FROM ${db_entity};`;
    let rsInfo = await knex.raw(sqlInfo);
    let count = rsInfo[0].total || 0;

    let perPage = 20;
    let jsonRs = await knex(db_entity).limit(perPage).offset((page-1)*perPage);

    let results = {
        info: {
            count,
            pages: Math.ceil(count / perPage)
        },
        results: jsonRs
    }
    return results;
}

async function getEntityById(entity, id, options){
    let db_entity = entity;
    const result = await knex(db_entity).where('id', id);   

    return result;    
}

async function deleteEntity(entity, id, options){
    let db_entity = entity;
    const result = await knex(db_entity).where('id', id).del();        
    console.log(result);
}

async function upsertEntity(entity, options={}){
    let db_entity = entity;

    const {
        data = {}
    } = options;

    console.log({data});
    const result = await knex(db_entity).insert(data).onConflict('id').merge();
    console.log(result);
}

async function migrateEntity(entity){
    let dbname = process.env.CRUD_DBNAME || 'data';
    let db_entity = entity;
    if(entity.slice(-1) == 's'){
        entity = entity.slice(0, -1);
    }

    // abrir / crear la BD
    let db = await open({
        filename: path.resolve(`./data/${dbname}.db`),
        driver  : sqlite.Database
    })
    .catch(err => {
        console.log({err});
        res
            .status(500)
            .json({
                error: true,
                ...err
            });
    });

    // consulta para obtener el modelo
    let jsonRsp = await getMigrateEntityById(entity, 1);
    let keys = Object.keys(jsonRsp);

    // crear la entidad
    let entityCols = keys.map(key => {
        let type = key === 'id' ? 'INTEGER PRIMARY KEY AUTOINCREMENT' : 'TEXT';
        return `${key} ${type}`
    })
    .join(',');

    let sql = `
        CREATE TABLE IF NOT EXISTS ${db_entity} (${entityCols});
    `;
    let table = await db.exec(sql)
    .catch(err => {
        console.log({err});
    });

    // poblar la entidad
    let optionsRS = {entity, page: 1};
    let jsonRS = await getMigrateEntitiesAll(optionsRS);
    let cols = keys.join(',');
    
    jsonRS.results.map(async reg => {
        let vals = "'" + Object.keys(reg)
            .map(col => {
                let value = (typeof reg[col] === 'object')
                    ? JSON.stringify(reg[col])
                    : reg[col]
                ;
                value = String(value).replace(/'/g,'');
                return value;
            }).join("','") + "'"
        ;
        let sql = `
            INSERT INTO
                ${db_entity}
                (${cols})
            VALUES
                (${vals})
        ;`;
        const result = await db.run(sql);
    });

    db.close();
}

async function getMigrateEntitiesAll(options){
    const {
        entity = '',
        page = 1
    } = options;

    let url = `${apiBaseURL}/${entity}/?page=${page}`;
    
    let rspJson = await fetch(url)
        .then(rslt => rslt.json())
        .catch(err => {
            console.log({err});
        })
    ;
    return rspJson;
}

async function getMigrateEntityById(entity, id){
    let url = `${apiBaseURL}/${entity}/${id}`;
    let rspJson = await fetch(url)
    .then(rslt => rslt.json())
    .catch(err => {
        console.log({err});
    });
    return rspJson;
}