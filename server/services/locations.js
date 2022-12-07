const fetch = require('node-fetch');

require('dotenv').config();

const apiBaseURL = process.env.API_BASE_URL || 'http://localhost' 

module.exports = {
    getLocationsAll,
    getLocationById
}

async function getLocationsAll(options){
    const {
        page = 1
    } = options;

    let url = `${apiBaseURL}/location/?page=${page}`;
    let rspJson = await fetch(url)
    .then(rslt => rslt.json())
    .catch(err => {
        console.log({err});
    });
    return rspJson;
}

async function getLocationById(id){
    let url = `${apiBaseURL}/location/${id}`;
    let rspJson = await fetch(url)
    .then(rslt => rslt.json())
    .catch(err => {
        console.log({err});
    });
    return rspJson;
}