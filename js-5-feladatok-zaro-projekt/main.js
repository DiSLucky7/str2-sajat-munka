import data from "./modules/readData.js";
import dataEng from "./modules/readEngData.js";
import dataHun from "./modules/readHunData.js";
import {choosingLanguage, getLanguage} from "./modules/chooseLanguage.js";
import {generatingTHead, generatingTBody} from "./modules/table.js";
import {deleteRow} from "./modules/deleteRow.js";
import {editRow} from "./modules/editRow.js";
import {addRow} from "./modules/addRow.js";

const url = 'http://localhost:3000/users/';

choosingLanguage(dataEng, dataHun);
const langDiv = document.querySelector('.language__buttons')
let language = dataEng;
let lang = language.dataEng;
language = getLanguage(dataEng);

if (language.hasOwnProperty('dataHun')) {
    lang = language.dataHun
} else {
    lang = language.dataEng
}

generatingTHead(lang[0]);
generatingTBody(data);
let deleteButtons
async function getDeleteButtons() {
    deleteButtons = await document.querySelectorAll('.delete__button');
}

let editButtons
async function getEditButtons() {
    editButtons = await document.querySelectorAll('.edit__button');
}

getDeleteButtons().then( () => deleteRow(deleteButtons, url))
getEditButtons().then( () => editRow(editButtons, deleteButtons, url, lang[1]))

addRow(data, url, lang[1], lang[2]);

langDiv.addEventListener('click', () => {
    language = getLanguage(dataEng);
   
    if (language.hasOwnProperty('dataHun')) {
        lang = language.dataHun
    } else {
        lang = language.dataEng
    }
    
    generatingTHead(lang[0]);
    generatingTBody(data);
    let deleteButtons
    async function getDeleteButtons() {
        deleteButtons = await document.querySelectorAll('.delete__button');
    }
    
    let editButtons
    async function getEditButtons() {
        editButtons = await document.querySelectorAll('.edit__button');
    }
    
    getDeleteButtons().then( () => deleteRow(deleteButtons, url))
    getEditButtons().then( () => editRow(editButtons, deleteButtons, url, lang[1]))
    
    addRow(data, url, lang[1], lang[2]);
})
