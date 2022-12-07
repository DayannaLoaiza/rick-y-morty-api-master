const fetch = require('node-fetch');

require('dotenv').config();

const apiBaseURL = process.env.API_BASE_URL || 'http://localhost' 

module.exports = {
    getCharactersAll,
    getCharacterById
}

async function getCharactersAll(options){
    const {
        page = 1
    } = options;

    let url = `${apiBaseURL}/character/?page=${page}`;
    let rspJson = await fetch(url)
    .then(rslt => rslt.json())
    .catch(err => {
        console.log({err});
    });
    return rspJson;
}

async function getCharacterById(id){
    let url = `${apiBaseURL}/character/${id}`;
    let rspJson = await fetch(url)
    .then(rslt => rslt.json())
    .catch(err => {
        console.log({err});
    });
    return rspJson;
}