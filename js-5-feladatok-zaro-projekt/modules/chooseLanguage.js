function choosingLanguage(dataEng, dataHun) {
    const english = document.querySelector('.english');
    const hungarian = document.querySelector('.hungarian');
    
    english.addEventListener('click', () => {
        localStorage.setItem('language', JSON.stringify(dataEng))
    })
    
    hungarian.addEventListener('click', () => {
        localStorage.setItem('language', JSON.stringify(dataHun))
        
    })
}

function getLanguage(dataEng) {
    let getLang = dataEng;
        getLang = JSON.parse(localStorage.getItem('language'))
    return getLang;
}

export {
    choosingLanguage, getLanguage
}
