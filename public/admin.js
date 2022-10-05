let addButton = document.querySelector('#add-book');


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

})


// async function main() {
// let response = await fetch('http://localhost:3001/listBooks', {
//     method: "GET",
//     headers: null,
//     body: null
// })

// let books = await response.json();
// console.log(books);
// }

// let response = await fetch('http://localhost:9001/updateBook', {
//     method:"PATCH", 
//     headers: { 
//         'Content-Type': 'application/json'
//     }, 
//     body: JSON.stringify({ 
//         "id": 3, 
//         "title": "Legends of Arathrae", 
//     }) 
// }); 
// let updatedBook = await response.json(); 
// console.log(updateBook)
// // Your Code Here
