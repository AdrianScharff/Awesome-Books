// checking if local storage is empty then add an empty array
if (localStorage.getItem('AddedBooks') === null) {
  localStorage.setItem('AddedBooks', JSON.stringify([]));
}

// store data into local storage
const storeData = JSON.parse(localStorage.getItem('AddedBooks'));

function updateData() {
  localStorage.setItem('AddedBooks', JSON.stringify(storeData));
}

function createBooks(arr) {
  let books = '';
  for (let i = 0; i < arr.length; i += 1) {
    books += `
            <p> ${arr[i].title} </p>
            <p> ${arr[i].author} </p>
            <button onclick="removeBook(${i})">Remove</button>
            </hr>
        `;
  }

  return books;
}

// Displaying data to the UI from local storage
function displayBooks() {
  const listOfBooks = document.querySelector('.booksContainer');
  listOfBooks.innerHTML = `
        <ul class="book-ul">
            ${createBooks(storeData)}</ul>
    `;
}

// Removing data from local storage
// eslint-disable-next-line no-unused-vars
function removeBook(i) {
  storeData.splice(i, 1);
  updateData();
  displayBooks();
}

// Adding new data in the local storage
function addNewData(bookTitle, bookAuthor) {
  const Book = {
    title: bookTitle,
    author: bookAuthor,
  };
  storeData.push(Book);
  updateData();
  displayBooks();
}

// Getting values from input fields
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  e.preventDefault();
  addNewData(title.value, author.value);
});

window.onload = displayBooks();