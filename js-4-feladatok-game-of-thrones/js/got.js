`use strict`

const url = '../json/got.json'
const itemsContainer = document.querySelector('.items__container')

let characters;
const getCharacters = async (url = '') => {
    const response = await fetch(url)
    const characters = await response.json()
    return characters.sort((a, b) => a.name > b.name ? 1 : -1);
};
getCharacters(url).then(characters => {

    function generatingChars() {
        for (let i = 0; i < characters.length; i++) {
            if (characters[i].hasOwnProperty('dead')) {
                characters.splice(i, 1)
            }
        }
        for (let i = 0; i < characters.length - 1; i++) {
            const item = `<div class="character__container">
            <img class="portrait__img img-highlight" src="${characters[i].portrait}" alt="">
            <span class="name">${characters[i].name}</span>
            </div>`

            itemsContainer.insertAdjacentHTML("beforeend", item);
        }

    }
    generatingChars();


    const characterInfoContainer = document.querySelector('.character-info__container')
    const portraitImg = document.querySelectorAll('.portrait__img')
    const name = document.querySelectorAll('.name')
    const aside = document.querySelector('aside')
    const asideButton = document.querySelector('.aside__button')

    let infoContent = true;

    function charInfoTemplate(char) {
        if (char.house) {
            return `<h2>Game of Thrones</h2>
            <img class="info__picture" src="${char.picture}" alt="">
            <div class="info__name-house__container">
            <h3 class="info__name">${char.name}</h3>
            <img class="info__house" src="assets/houses/${char.house}.png" alt="">
            </div>
            <p class="info__bio">${char.bio}</p>`
        } else {
            return `<h2>Game of Thrones</h2>
            <img class="info__picture" src="${char.picture}" alt="">
            <div class="info__name-house__container">
            <h3 class="info__name">${char.name}</h3>
            </div>
            <p class="info__bio">${char.bio}</p>`
        }
    }


    function charInfoInsert(char, index, item) {
        while (characterInfoContainer.firstChild) {
            characterInfoContainer.removeChild(characterInfoContainer.firstChild);
        }
        characterInfoContainer.insertAdjacentHTML('beforeend', item);
        const img = document.querySelector('.info__picture');
        img.addEventListener('error', function (event) {
            event.target.src = 'assets/pictures/placeholder.jpg'
            event.onerror = null
        })
        portraitImg.forEach(pic => pic.classList.remove('img-lightning'));
        name.forEach(pic => pic.classList.remove('name-bold'));
        portraitImg[index].classList.add('img-lightning');
        name[index].classList.add('name-bold');
    }


    function generatingCharInfo(element) {
        element.forEach((char, index) => {
            const item = charInfoTemplate(characters[index]);
            char.addEventListener('click', () => {
                charInfoInsert(char, index, item)
            })
        });
    }
    generatingCharInfo(portraitImg);
    generatingCharInfo(name);


    function searchingCharacters() {
        asideButton.addEventListener('click', () => {
            const search = document.querySelector('.search__input');
            const index = characters.findIndex((char, index) => char.name.toLowerCase() === search.value.toLowerCase());
            if (index === -1) {
                char = {
                    name: 'Character not found',
                    picture: 'assets/pictures/placeholder.jpg',
                    bio: 'Please search for a valid character!',
                    house: undefined
                }
                const item = charInfoTemplate(char);
                charInfoInsert(char, index, item);
            } else {
                const item = charInfoTemplate(characters[index]);
                charInfoInsert(characters[index], index, item)
            }
        });

    }
    searchingCharacters();
});
