class BookManager {
  constructor() {
    if (localStorage.getItem("AddedBooks") === null) {
      localStorage.setItem("AddedBooks", JSON.stringify([]));
    }

    this.storeData = JSON.parse(localStorage.getItem("AddedBooks"));
    this.form = document.querySelector('form');
    this.titleInput = document.querySelector(".title");
    this.authorInput = document.querySelector(".author");

    this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
  }

  updateData () {
    localStorage.setItem("AddedBooks", JSON.stringify(this.storeData));
  }

  createBooks() {
    let books = "";
    for (let i = 0; i < this.storeData.length; i += 1) {
      books += `
        <p> ${this.storeData[i].title} </p>
        <p> ${this.storeData[i].author} </p>
        <button onclick="bookManager.removeBook(${i})">Remove</button>
        </hr>
      `;
    }

    return books;
  }

  displayBooks() {
    const listOfBooks = document.querySelector('.booksContainer');
    listOfBooks.innerHTML = `
      <ul class="book-ul">
        ${this.createBooks()}</ul>
    `;
  }

  removeBook(i) {
    this.storeData.splice(i, 1);
    this.updateData();
    this.displayBooks();
  }

  addNewData(bookTitle, bookAuthor) {
    const book = {
        title: bookTitle,
        author: bookAuthor,
    };
    this.storeData.push(book);
    this.updateData();
    this.displayBooks();
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.addNewData(this.titleInput.value, this.authorInput.value);
  }

  init() {
    this.displayBooks();
  }
}

const bookManager = new BookManager();
bookManager.init();