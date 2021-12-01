function deleteRow(deleteButtons, url) {
    deleteButtons.forEach((button) => button.addEventListener('click', row => {
        const tr = button.parentNode.parentNode;
        const id = tr.children[0].textContent;
        
        //USING AXIOS:
        axios.delete(url + id, { data: {"id": id} })
            .then(() => console.log('deleted'))

        //USING FETCH:
        // fetch(url + id, {
        //         method: 'DELETE',
        //     })
        //     .then(() => console.log('deleted'))
    }))
}

export {
    deleteRow
}
