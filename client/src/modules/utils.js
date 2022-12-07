import React from 'react';

const utils = {
    loremRandomWord: () => {
        let words = 'Lorem ipsum dolor sit amet consectetur adipiscing elit In sit amet massa orci Ut commodo ligula sapien ultricies blandit mauris'.split(' ');
        return words[~~(Math.random()*words.length)]
    }
}

export default utils;