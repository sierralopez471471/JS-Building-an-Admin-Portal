let addButton = document.querySelector('#add-book');
let deleteButton = document.querySelector('#delete-book');
async function renderBooks() {
let response = await fetch('http://localhost:3001/listBooks');
let data = await response.json();
let list = document.querySelector('#book-list');
let newHTML = '<ul>';
data.forEach(book => {
    newHTML += `
    <li>
    ${book.id}: ${book.title} (${book.year}) 
    <input id = "new-qty-${book.id}" type = "number" value = "${book.quantity}">
    <button class = "update-button" id = "update-${book.id}">Update</button>
    </li>
    `
   })

   newHTML += '</ul>'
   list.innerHTML = newHTML;

   document.querySelectorAll('.update-button').forEach(button => {
    button.addEventListener('click', async () => {
        let id = button.id.replace(/\D/g, '');
        let value = document.querySelector(`new-qty-${id}`).value;
        await fetch ('http://localhost:3001/updateBook', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            quantity: value,
        })
    })
    })
   })
}

async function assignId() {
let newId = 0;
let response = await fetch('http://localhost:3001/listBooks');

let data = await response.json();

data.forEach(book => {
    if(book.id > newId){
        newId = book.id
    }
   })
   return newId + 1;
}   


addButton.addEventListener('click', async () => {
    let id = await assignId

    let dataToSend = {
        id: id,
        title: document.querySelector('#add-title').value,
        year: document.querySelector('#add-year').value,
        description: document.querySelector('#add-description').value,
        quantity: document.querySelector('#add-quantity').value,
        imgURL: document.querySelector('#add-imgURL').value
    }
    fetch ('http://localhost:3001/addBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    //clears form after adding book
        document.querySelector('#add-title').value = '';
        document.querySelector('#add-year').value = '';
        document.querySelector('#add-description').value = '';
        document.querySelector('#add-quantity').value = '';
        document.querySelector('#add-imgURL').value = '';
    
        await renderBooks();
})

deleteButton.addEventListener('click', async () => {
    let bookId = document.querySelector('#delete-id').value;

    
    await fetch (`http://localhost:3001/removeBook/${bookId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        document.querySelector('#delete-id').value = '';
    
        await renderBooks();
})
renderBooks();


// // Your Code Here
