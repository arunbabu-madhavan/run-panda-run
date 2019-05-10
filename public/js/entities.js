
import { loadFox } from './entites/fox.js';
import { loadCroc } from './entites/croc.js';
import { loadPanda}  from './entites/panda.js'
import { loadCrab } from './entites/crab.js';
import { loadCoin } from './entites/coin.js';
import { loadGrowthPower } from './entites/grow.js';

import { loadWolf } from './entites/wolf.js';
import { loadPandaCub } from './entites/pandacub.js'
import { loadLevelUpPower } from './entites/levelup.js';
import { loadOneUpPower } from './entites/oneup.js';




export function loadEntities(){

    const entityFactories ={};

    function addAs(name){
        return factory => entityFactories[name] = factory
    }


    return Promise.all(
        [loadPanda().then(addAs('panda')),
        loadFox().then(addAs('fox')),
        loadCroc().then(addAs('croc')),
        loadCoin().then(addAs('coin')),
        loadGrowthPower().then(addAs('growth_power')),
        loadLevelUpPower().then(addAs('levelup_power')),
        loadCrab().then(addAs('crab')),
        loadWolf().then(addAs('wolf')),
        loadPandaCub().then(addAs('pandacub')),
        loadOneUpPower().then(addAs('oneup_power'))
        
            ])

        .then(()=>entityFactories);
}