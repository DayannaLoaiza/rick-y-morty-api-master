import React from 'react';

const CRUD = {

    migrate: async () => { },

    read: async () => { },

    load: async (entity, options={}) => {
        const {
            page = 1
        } = options;

        let url = `http://localhost:7000/crud/${entity}/?page=${page}`;
        
        let jsonRS = await fetch(url, {
                method: 'GET',
                headers: {
                    token: '#TOKEN12345=='
                }
            })
            .then(rslt => rslt.json())
            .catch(err => console.log({err}))
        ;
        return jsonRS || []
    },

    create: async (entity, options={}) => {
        const {
            data = {}
        } = options;
        
        let url = `http://localhost:7000/crud/${entity}`;
        let jsonRS = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    token: '#TOKEN12345=='
                },
                body: JSON.stringify(data)
            })
            .then(rslt => rslt.json())
            .catch(err => console.log({err}))
        ;
        console.log({jsonRS});

        console.log('CREATE ' + entity + ' WITH ', data);
        return jsonRS || []
    },
    
    update: async (entity, options={}) => {
        const {
            data = {id:999}
        } = options;

        const {
            id
        } = data;
        
        let url = `http://localhost:7000/crud/${entity}/?id=${id}`;
        let jsonRS = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    token: '#TOKEN12345=='
                },
                body: JSON.stringify(data)
            })
            .then(rslt => rslt.json())
            .catch(err => console.log({err}))
        ;
        console.log({jsonRS});
        console.log('UPDATE ' + entity + ' WITH ', data);

        return jsonRS || []
    },

    delete: async (entity, id, options={}) => {
        const {
        } = options;
        
        let url = `http://localhost:7000/crud/${entity}/?id=${id}`;
        let jsonRS = await fetch(url, {
                method: 'DELETE',
                headers: {
                    token: '#TOKEN12345=='
                }
            })
            .then(rslt => rslt.json())
            .catch(err => console.log({err}))
        ;
        console.log({jsonRS});
        
        return jsonRS;
    }
}

export default CRUD;