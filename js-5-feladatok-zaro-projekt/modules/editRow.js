//USING AXIOS:
const fetching = async (tr, url) => {
    return await axios({
            url: url + tr.children[0].textContent,
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            data: JSON.stringify({
                name: tr.children[1].children[1].value,
                emailAddress: tr.children[2].children[1].value,
                address: tr.children[3].children[1].value
            })
        })
        .then((response) => {
            return response.data;
        }).catch((err) => console.log(err))
}

//USING FETCH:
// async function fetching(tr, url) {
//     return await fetch(url + tr.children[0].textContent, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: tr.children[1].children[1].value,
//                 emailAddress: tr.children[2].children[1].value,
//                 address: tr.children[3].children[1].value
//             }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// }


function addClass(button, className = 'display-none') {
    button.classList.add(className);
}

function removeClass(button, className = 'display-none') {
    button.classList.remove(className);
}


function validate(element, i) {
    const regex = [
        /^([A-ZÁÉÓÖŐÜÚŰÍ][a-záéíóöőúüű]{1,20}[ -]){1,20}[A-ZÁÉÓÖŐÜÚŰÍ][a-záéíóöőúüű]{1,20}$/,
        /^[a-z0-9.-]{2,30}@([a-z]{2,20}\.){1,3}[a-z]{2,10}$/,
        /^[0-9]{1,9}\s([A-ZÁÉÓÖŐÜÚŰÍ][a-záéíóöőúüű.'-]{1,15}\s){1,4}[A-ZÁÉÓÖŐÜÚŰÍ][a-záéíóöőúüű.'-]{1,20}$/
    ]
    return regex[i].test(element.value);
}


function disableButtons(buttons, index, bool) {
    buttons.forEach((btn, i) => {
        i === index ? btn.disabled = !bool : btn.disabled = bool
    })
}


function changeButtons(tr, initialTr, editButtons, deleteButtons, url, language) {
    const {valid, invalid} = language;
    const editButton = tr.children[4].children[0]
    const saveButton = tr.children[4].children[1]
    const deleteButton = tr.children[5].children[0]
    const cancelButton = tr.children[5].children[1]
    const inputs = [tr.children[1].children[1], tr.children[2].children[1], tr.children[3].children[1]]
    const messages = [tr.children[1].children[0], tr.children[2].children[0], tr.children[3].children[0]]
    removeClass(saveButton)
    addClass(editButton)
    let nothingChanged = true;

    for (let i = 0; i < inputs.length; i++) {
        if (nothingChanged) {
            if (validate(inputs[0], 0) && validate(inputs[1], 1) && validate(inputs[2], 2)) {
                messages[i].textContent = valid;
                removeClass(messages[i], 'invalid__message')
                addClass(messages[i], 'valid__message')
                removeClass(inputs[i], 'invalid__input')
                addClass(inputs[i], 'valid__input')
                saveButton.addEventListener('click', () => {
                    fetching(tr, url);
                    addClass(saveButton)
                    removeClass(editButton)
                    addClass(cancelButton)
                    removeClass(deleteButton)
                })
            }
        }
        
        inputs[i].addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                saveButton.click();
            }

            nothingChanged = false;
            if (validate(inputs[0], 0) && validate(inputs[1], 1) && validate(inputs[2], 2)) {
                messages[i].textContent = valid;
                saveButton.disabled = false;
                removeClass(messages[i], 'invalid__message')
                addClass(messages[i], 'valid__message')
                removeClass(inputs[i], 'invalid__input')
                addClass(inputs[i], 'valid__input')
                saveButton.addEventListener('click', () => {
                    fetching(tr, url).then(() => {
                        addClass(saveButton)
                        removeClass(editButton)
                        addClass(cancelButton)
                        removeClass(deleteButton)
                    })
                })
            } else {
                messages[i].textContent = invalid;
                saveButton.disabled = true;
                removeClass(messages[i], 'valid__message')
                addClass(messages[i], 'invalid__message')
                removeClass(inputs[i], 'valid__input')
                addClass(inputs[i], 'invalid__input')
            }
        })
    }

    removeClass(cancelButton)
    addClass(deleteButton)

    cancelButton.addEventListener('click', () => {
        for (let i = 1; i < 4; i++) {
            tr.children[i].textContent = initialTr[i - 1];
        }
        addClass(saveButton)
        removeClass(editButton)
        addClass(cancelButton)
        removeClass(deleteButton)
        disableButtons(editButtons, -1, false);
        disableButtons(deleteButtons, -1, false);
    })
}


function editRow(editButtons, deleteButtons, url, language) {
    editButtons.forEach((button, index) => button.addEventListener('click', () => {
        const tr = button.parentNode.parentNode;
        const initialTr = [
            tr.children[1].textContent,
            tr.children[2].textContent,
            tr.children[3].textContent
        ];

        disableButtons(editButtons, index, true);
        disableButtons(deleteButtons, index, true);
        for (let i = 1; i < 4; i++) {
            let editedTd = tr.children[i]
            const textContent = editedTd.textContent;
            editedTd.textContent = '';

            editedTd.insertAdjacentHTML("beforeend", `<div></div><input class="edit__input" type="text" value="${textContent}">`);
        }
        changeButtons(tr, initialTr, editButtons, deleteButtons, url, language);
    }))
}

export {
    editRow
}
