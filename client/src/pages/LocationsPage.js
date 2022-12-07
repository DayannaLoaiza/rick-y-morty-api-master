import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';

import ContentPage from '../components/ContentPage';
import CardsGrid from '../components/CardsGrid';

import Pagination from '../components/Pagination';
import ModalDialog from '../components/ModalDialog';

import LocationModalContent from '../fragments/LocationModalContent';
import LocationGridCard from '../fragments/LocationGridCard';

function LocationsPage() {
    const [data, setData] = useState([]);
    const [info, setInfo] = useState({});
    const [page, setPage] = useState(1);
    const [currentRegContent, setCurrentRegContent] = useState('');
    const [currentReg, setCurrentReg] = useState({});

    useEffect(async () => {
        loadLocations();
        let currentPage = document.location.search;
    }, []);

    async function loadLocations(page=1){
        setData([]);

        let url = `http://localhost:7000/locations/?page=${page}`;
        
        let jsonRslt = await fetch(url, {
                headers: {
                    token: '#TOKEN12345=='
                }
            })
            .then(rslt => rslt.json())
            .catch(err => {console.log({err})})
        ;
        
        let info = jsonRslt.info || {};
        let data = jsonRslt.results || [];
        
        data.forEach(async (ep, i) => {
            data[i].starring = [];
            ep.residents.slice(-4).map(async ch => {
                let idCh = ch.split('/').slice(-1)[0];
                data[i].starring.push(`https://rickandmortyapi.com/api/character/avatar/${idCh}.jpeg`);
            })
            if(data[i].starring.length < 4){
                Array(4-data[i].starring.length).fill('').forEach( () => {
                    data[i].starring.push(`http://localhost:3000/static/img/unknown_character_inv.png`);
                })
            }
        })
        
        setInfo(info);
        setData(data);
        setPage(page);
    }

    function clickCardHandle(reg){
        setCurrentReg(reg);
        let htmlReg = (
            <LocationModalContent reg={reg} />
        );
        setCurrentRegContent(htmlReg);
        $('#locationsModal').modal();
    }

    function renderCardHandle(reg, i){
        return (
            <LocationGridCard reg={reg} key={i} clickCardHandle={clickCardHandle}/>
        )
    }

    return (
        <ContentPage>

            <legend className='pb-2'>Lugares <small>({info.count})</small></legend>
            
            <CardsGrid data={data} renderCardHandle={renderCardHandle}/>
            
            <Switch>
                <Pagination current={page} info={info} pagingHandle={loadLocations}/>
            </Switch> 
            
            <ModalDialog
                title={`Lugar: ${currentReg.name}`}
                reg={currentReg}
                id='locationsModal' 
            >
                {currentRegContent}
            </ModalDialog>
        
        </ContentPage>
    )
}

export default LocationsPage;
