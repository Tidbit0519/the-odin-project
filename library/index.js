document.addEventListener("DOMContentLoaded", function() {
  class Book {
    constructor(name, author, pages, read) {
      this.name = name;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  }

  const myLibrary = [];

  const book1 = new Book("Book1", "Jason", 100, false);
  myLibrary.push(book1);
  console.log(book1);

  // Add an example book to the library and display it initially
  const book2 = new Book("Book2", "Emma", 200, true);
  myLibrary.push(book2);
  console.log(book2);

  const displayBooks = () => {
    const bookListContainer = document.getElementById('library-grid');
    bookListContainer.innerHTML = ''; // Clear the previous contents

    myLibrary.forEach((book, index) => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');
      bookCard.id = 'book-card-' + index;

      const bookInfo = document.createElement('div');
      bookInfo.classList.add('book-info');

      const title = document.createElement('h2');
      title.classList.add('book-title');
      title.textContent = 'Title: ' + book.name;

      const author = document.createElement('h3');
      author.classList.add('book-author');
      author.textContent = 'Author: ' + book.author;

      const pages = document.createElement('p');
      pages.classList.add('book-pages');
      pages.textContent = 'Pages: ' + book.pages;

      const status = document.createElement('p');
      status.classList.add('book-status');
      status.textContent = 'Read: ' + (book.read ? 'Yes' : 'No');

      const actionBtns = document.createElement('div');
      actionBtns.classList.add('action-btns');

      const toggleButton = document.createElement('button');
      toggleButton.classList.add('read-btn');
      toggleButton.textContent = 'Read';
      toggleButton.addEventListener('click', () => {
        book.read = !book.read;
        displayBooks(); // Update the status text after the button click
      });

      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-btn');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        displayBooks(); // Re-render the library after removing the book
      });

      bookInfo.appendChild(title);
      bookInfo.appendChild(author);
      bookInfo.appendChild(pages);
      bookInfo.appendChild(status);

      actionBtns.appendChild(toggleButton);
      actionBtns.appendChild(removeButton);

      bookCard.appendChild(bookInfo);
      bookCard.appendChild(actionBtns);

      bookListContainer.appendChild(bookCard);
    });
  };

  displayBooks();

  const showForm = () => {
    console.log("show form");
    var formId = document.getElementById("form-popup");
    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    formId.style.display = "block";
  };
  document.getElementById("btn-add").addEventListener("click", showForm);

  const hideForm = () => {
    console.log("hide form");
    var formId = document.getElementById("form-popup");
    var overlay = document.getElementById("overlay");
    overlay.style.display = "none";
    formId.style.display = "none";
  };
  document.getElementById("overlay").addEventListener("click", hideForm);

  const addBookToLibraryFromForm = () => {
    event.preventDefault();
    console.log("addBookToLibraryFromForm");
    const bookName = document.querySelector('input[name="book-name"]').value;
    const author = document.querySelector('input[name="author"]').value;
    const pages = parseInt(document.querySelector('input[name="pages"]').value);
    const read = document.querySelector('input[name="read"]').checked;
    addBookToLibrary(bookName, author, pages, read);
  };

  const addBookToLibrary = (name, author, pages, read) => {
    const newBook = new Book(name, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
    hideForm();
  };
  document.getElementById("btn-submit-new-book").addEventListener("click", addBookToLibraryFromForm);
})