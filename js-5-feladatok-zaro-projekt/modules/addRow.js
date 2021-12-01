const inputRow = document.querySelector('.input__row')
//USING AXIOS:
const fetching = async (url) => {
    return await axios({
            url: url,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            data: JSON.stringify({
                name: inputRow.children[1].children[1].value,
                emailAddress: inputRow.children[2].children[1].value,
                address: inputRow.children[3].children[1].value
            })
        })
        .then(response => response.json())
        .then(data => {
           console.log('Success:', data);
        })
        .catch((error) => {
            console.log('Error:', error);
        });
}

//USING FETCH:
// async function fetching(url) {
//     return await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: inputRow.children[1].children[1].value,
//                 emailAddress: inputRow.children[2].children[1].value,
//                 address: inputRow.children[3].children[1].value
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

function insertElement(target, where, element) {
    target.insertAdjacentHTML(where, element);
}

function deleteInputs() {
    for (let i = 1; i < 4; i++) {
        inputRow.children[i].children[1].value = "";
    }
}

function validate(element, i) {
    const regex = [
        /^([A-ZÁÉÓÖŐÜÚŰÍ][a-záéíóöőúüű]{1,20}[ -]){1,20}[A-ZÁÉÓÖŐÜÚŰÍ][a-záéíóöőúüű]{1,20}$/,
        /^[a-z0-9.-]{2,30}@([a-z]{2,20}\.){1,3}[a-z]{2,10}$/,
        /^[0-9]{1,7}\s([A-ZÁÉÓÖŐÜÚŰÍ][a-záéíóöőúüű.'-]{1,20}\s){1,4}[A-ZÁÉÓÖŐÜÚŰÍ][a-záéíóöőúüű.'-]{1,20}$/
    ]
    return regex[i].test(element.value);
}

function addClass(button, className = 'visibility-hidden') {
    button.classList.add(className);
}

function removeClass(button, className = 'visibility-hidden') {
    button.classList.remove(className);
}

function addRow(data, url, language, pHolder) {
    const {valid, invalid} = language;
    const {placeholder} = pHolder;
    const maxId = Math.max.apply(Math, data.data.map(user => user.id));
    const allTh = document.querySelectorAll('.input__row th')
    
    for (let i = 0; i < allTh.length; i++) {
        allTh[i].remove()
    }
    
    insertElement(inputRow, "beforeend", `<th class="next__id"><div class="visibility-hidden">a</div>${maxId + 1}</th>`);
    for (let i = 1; i < 4; i++) {
        insertElement(inputRow, "beforeend", `<th><div class="visibility-hidden">a</div><input class="add__input" type="text" placeholder="${placeholder}"></th>`);
    }
    insertElement(inputRow, "beforeend", `
        <th>
            <div class="visibility-hidden">a</div>
            <button class="edit__button"><i class="fa fa-save" aria-hidden="true"></i></button>
        </th>
        <th>
            <div class="visibility-hidden">a</div>
            <button class="delete__button"><i class="fa fa-ban" aria-hidden="true"></i></button>
        </th>`);
    const saveButton = inputRow.children[4].children[1]
    const cancelButton = inputRow.children[5].children[1]
    const inputs = [inputRow.children[1].children[1], inputRow.children[2].children[1], inputRow.children[3].children[1]]
    const messages = [inputRow.children[1].children[0], inputRow.children[2].children[0], inputRow.children[3].children[0]]

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keyup', e => {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    saveButton.click();
                }
    
            removeClass(messages[i])
            if (validate(inputs[i], i)) {
                messages[i].textContent = valid;
                removeClass(messages[i], 'invalid__message')
                addClass(messages[i], 'valid__message')
                removeClass(inputs[i], 'invalid__input')
                addClass(inputs[i], 'valid__input')
            } else {
                messages[i].textContent = invalid;
                saveButton.disabled = true;
                removeClass(messages[i], 'valid__message')
                addClass(messages[i], 'invalid__message')
                removeClass(inputs[i], 'valid__input')
                addClass(inputs[i], 'invalid__input')
            }

            if (validate(inputs[0], 0) && validate(inputs[1], 1) && validate(inputs[2], 2)) {
                messages[i].textContent = valid
                saveButton.disabled = false;
                removeClass(messages[i], 'invalid__message')
                addClass(messages[i], 'valid__message')
                removeClass(inputs[i], 'invalid__input')
                addClass(inputs[i], 'valid__input')
                saveButton.addEventListener('click', () => {
                    fetching(inputRow, url)
                })
            }
        })

        if (inputs[0].value === "" && inputs[1].value === "" && inputs[2].value === "") {
            saveButton.disabled = true;
        }
    }

    saveButton.addEventListener('click', () => {
        fetching(url);
        deleteInputs();
    })

    cancelButton.addEventListener('click', () => {
        deleteInputs();
        for (let i = 0; i < 3; i++) {
            messages[i].textContent = "a";
            addClass(messages[i]);
        }
    })
}

export {
    addRow
}
