const thead = document.querySelector('thead');
const tbody = document.querySelector('tbody');

export function generatingTHead(language) {
    const {id, name, emailAddress, address, edit} = language;
    const trow = `
    <tr>
        <th>${id}</th>
        <th>${name}</th>
        <th>${emailAddress}</th>
        <th>${address}</th>
        <th colspan="2">${edit}</th>
    </tr>`
    thead.children[0].remove()
    thead.insertAdjacentHTML("afterbegin", trow);
}

export function generatingTBody(data) {
    tbody.children[0].remove()
    for (let i = 0; i < data.data.length; i++) {
            const {id, name, emailAddress, address} = data.data[i];
            const trow = `
            <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${emailAddress}</td>
            <td>${address}</td>
            <td>
            <button class="edit__button"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="save__button display-none"><i class="fa fa-save" aria-hidden="true"></i></button>
            </td>
            <td>
            <button class="delete__button"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <button class="cancel__button display-none"><i class="fa fa-ban" aria-hidden="true"></i></button>
            </td>
            </tr>`
        tbody.insertAdjacentHTML("afterbegin", trow);
    }
}
