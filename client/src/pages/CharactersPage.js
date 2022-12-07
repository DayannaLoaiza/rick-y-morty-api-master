import React, { useEffect, useRef, useState } from 'react';
import { Switch } from 'react-router-dom';

import ContentPage from '../components/ContentPage';
import CardsGrid from '../components/CardsGrid';
import Pagination from '../components/Pagination';
import ModalDialog from '../components/ModalDialog';
import ContentTitle from '../components/ContentTitle';

import CharacterModalContent from '../fragments/CharacterModalContent';
import CharacterGridCard from '../fragments/CharacterGridCard';

import CRUD from '../modules/crud';

function CharactersPage() {
    const [data, setData] = useState([]);
    const [info, setInfo] = useState({});
    const [page, setPage] = useState(1);
    const [currentRegContent, setCurrentRegContent] = useState('');
    const [currentReg, setCurrentReg] = useState({});
    const [alertMsg, setAlertMsg] = useState('');

    useEffect(async () => {
        loadCharactersCRUD();
        let currentPage = document.location.search;
    }, []);

    async function loadCharactersCRUD(page=1){
        let options = {
            page
        };
        let entity = 'characters';
        let jsonRslt = await CRUD.load(entity, options);

        let info = jsonRslt.info || {};
        let data = jsonRslt.results || [];

        setInfo(info);
        setData(data);
        setPage(page);
    }

    async function loadCharacters(page=1){
        setData([]);

        let url = `http://localhost:7000/characters/?page=${page}`;
        
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
        setInfo(info);
        setData(data);
        setPage(page);
    }

    function clickCardHandle(reg){
        setCurrentReg(reg);
        let htmlReg = (
            <CharacterModalContent reg={reg} isWritable={true} />
        );
        setCurrentRegContent(htmlReg);
        $('#charactersModal').modal();
    }

    function renderCardHandle(reg, i){
        return (
            <CharacterGridCard reg={reg} key={i} clickCardHandle={clickCardHandle}/>
        )
    }

    function newRecordHandle(){
        $('#newCharacterModal').modal();
    }

    async function onSaveHandle(isNew){
        var objectData = {};
        
        let idForm = isNew ? 'newCharacterCrudForm' : 'characterCrudForm';

        let characterCrudForm = document.getElementById(idForm);
        let formData = new FormData(characterCrudForm);
        
        formData.forEach(function(value, key){
            objectData[key] = value;
        });
        
        if(isNew){
            CRUD.create('characters', {data: objectData});
        } else {
            CRUD.update('characters', {data: objectData});
        }

        onCancelHandle();

        setAlertMsg('El personaje ha guardado con éxito.');
        $('#alertModal').modal();
    }
    
    async function onDeleteHandle(){
        let rsp = confirm('Confirme eliminar el registro actual.');
        if(rsp == 1){
            let rsp = await CRUD.delete('characters', currentReg.id);
            onCancelHandle();

            setAlertMsg('El personaje ha sido eliminado con éxito.');
            $('#alertModal').modal();
        }
    }
    
    function onCancelHandle(){
        $('#charactersModal')  .modal('hide');
        $('#newCharacterModal').modal('hide');
    }

    return (
        <ContentPage>

            <ContentTitle title='Personajes' total={info.count} isCrud={true} newRecordHandle={newRecordHandle} />
            
            <CardsGrid data={data} renderCardHandle={renderCardHandle}/>
            
            <Switch>
                <Pagination current={page} info={info} pagingHandle={loadCharactersCRUD}/>
            </Switch>

            <ModalDialog
                onSaveHandle={onSaveHandle}
                onCancelHandle={onCancelHandle}
                onDeleteHandle={onDeleteHandle}

                title={`Personaje: ${currentReg.name}`}
                reg={currentReg}
                id='charactersModal' 
                actions={['save','delete','cancel']}
            >
                {currentRegContent}
            </ModalDialog>

            <ModalDialog
                onSaveHandle={onSaveHandle}
                onCancelHandle={onCancelHandle}
                onDeleteHandle={onDeleteHandle}

                title={`Crear nuevo Personaje`}
                id='newCharacterModal'
                entity='characters'
                actions={['dummy', 'save','cancel']}
                isNew={true}
            >
                {
                    data[0] &&
                    <CharacterModalContent
                        reg={data[0]}
                        isWritable={true}
                        isNew={true}
                    />
                }
            </ModalDialog>

            <ModalDialog
                maxwidth='30vw'
                id='alertModal'
            >
                {alertMsg}
            </ModalDialog>

        </ContentPage>
    )
}

export default CharactersPage;
