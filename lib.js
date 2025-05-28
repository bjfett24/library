const myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function() {
        let checkRead = (this.read)? 'read': 'not read yet';
        return `${this.title} by ${this.author}, ${pages} pages, ${checkRead}.`;
    }
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read
};

function addBooktoLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}




function displayBooks() {

    container = document.querySelector('#booksTableContainer')

    container.innerHTML = '';
    
    
    const table = document.createElement('table');
    container.appendChild(table);

    const row1 = document.createElement('tr');
    table.appendChild(row1);
    
    const titleHead = document.createElement('th');
    titleHead.textContent = 'Title'
    row1.appendChild(titleHead);
    
    const authorHead = document.createElement('th');
    authorHead.textContent = 'Author'
    row1.appendChild(authorHead);
    
    const pagesHead = document.createElement('th');
    pagesHead.textContent = 'Pages'
    row1.appendChild(pagesHead);
    
    const readHead = document.createElement('th');
    readHead.textContent = 'Read?'
    row1.appendChild(readHead);
    
    const idHead = document.createElement('th');
    idHead.textContent = 'Book ID'
    row1.appendChild(idHead);

    
    for (let book of myLibrary) {
        const newRow = document.createElement('tr');
        table.appendChild(newRow);
        
        const newTitle = document.createElement('td');
        newTitle.textContent = book.title;
        newRow.appendChild(newTitle);

        const newAuthor = document.createElement('td');
        newAuthor.textContent = book.author;
        newRow.appendChild(newAuthor);

        const newPages = document.createElement('td');
        newPages.textContent = book.pages;
        newRow.appendChild(newPages);

        const newRead = document.createElement('td');
        //newRead.textContent = book.read;
        newRow.appendChild(newRead);

        const readStatusButton = document.createElement('button');
        (book.read)? readStatusButton.textContent = 'Yes': readStatusButton.textContent = 'No';
        readStatusButton.addEventListener('click', () => {
            book.toggleReadStatus();
            displayBooks();
        })
        newRead.appendChild(readStatusButton);

        const newID = document.createElement('td');
        newID.textContent = book.id;
        newRow.appendChild(newID);

        const removeBox = document.createElement('td');
        newRow.appendChild(removeBox);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', removeBookFromLibrary.bind(book.id));
        removeBox.appendChild(removeButton);
    }
}

function removeBookFromLibrary(bookID) {
    myLibrary.splice(myLibrary.findIndex(book => book.id === bookID), 1);
    displayBooks();
}


function newBookDialog() {
    const popUp = document.createElement('dialog');
    popUp.classList.add('popUp');
    document.body.appendChild(popUp);

    const dialogContainer = document.createElement('div');
    dialogContainer.classList.add('dialogContainer');
    popUp.appendChild(dialogContainer);
    
    const dialogHead = document.createElement('div');
    dialogHead.classList.add('dialogHead');
    dialogHead.textContent = 'Insert Book Information';
    dialogContainer.appendChild(dialogHead);

    const bookForm = document.createElement('form');
    bookForm.classList.add('bookForm');
    bookForm.action = '#';
    bookForm.method = 'dialog';
    dialogContainer.appendChild(bookForm);

    const titleLabel = document.createElement('label');
    titleLabel.classList.add('title', 'label');
    titleLabel.for = 'title';
    titleLabel.textContent = 'Book Title';
    bookForm.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.classList.add('title', 'input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    bookForm.appendChild(titleInput);

    const authorLabel = document.createElement('label');
    authorLabel.classList.add('author', 'label');
    authorLabel.for = 'author';
    authorLabel.textContent = 'Author';
    bookForm.appendChild(authorLabel);

    const authorInput = document.createElement('input');
    authorInput.classList.add('author', 'input');
    authorInput.type = 'text';
    authorInput.id = 'author';
    bookForm.appendChild(authorInput);

    const pagesLabel = document.createElement('label');
    pagesLabel.classList.add('pages', 'label');
    pagesLabel.for = 'pages';
    pagesLabel.textContent = 'Number of Pages';
    bookForm.appendChild(pagesLabel);

    const pagesInput = document.createElement('input');
    pagesInput.classList.add('pages', 'input');
    pagesInput.type = 'text';
    pagesInput.id = 'pages';
    bookForm.appendChild(pagesInput);

    const readLabel = document.createElement('label');
    readLabel.classList.add('read', 'label');
    readLabel.textContent = 'Have you read this book?';
    bookForm.appendChild(readLabel);

    const radioOptCont = document.createElement('div');
    radioOptCont.classList.add('radioOptionContainer');
    bookForm.appendChild(radioOptCont);
    
    const radioYes = document.createElement('div');
    radioYes.classList.add('radio-option');
    radioOptCont.appendChild(radioYes);
    
    
    const radioTrueLabel = document.createElement('label');
    radioTrueLabel.classList.add('radioTrue', 'label');
    radioTrueLabel.for = 'radioTrue';
    radioTrueLabel.textContent = 'Yes';
    radioYes.appendChild(radioTrueLabel);

    const radioTrueInput = document.createElement('input');
    radioTrueInput.type = 'radio';
    radioTrueInput.id = 'radioTrue';
    radioYes.appendChild(radioTrueInput);

    
    const radioNo = document.createElement('div');
    radioNo.classList.add('radio-option');
    radioOptCont.appendChild(radioNo);

    const radioFalseLabel = document.createElement('label');
    radioFalseLabel.classList.add('radioFalse', 'label');
    radioFalseLabel.for = 'radioFalse';
    radioFalseLabel.textContent = 'No';
    radioNo.appendChild(radioFalseLabel);

    const radioFalseInput = document.createElement('input');
    radioFalseInput.type = 'radio';
    radioFalseInput.id = 'radioFalse';
    radioNo.appendChild(radioFalseInput);


    const doneButton = document.createElement('button');
    doneButton.type = 'submit';
    doneButton.classList.add('doneButton')
    doneButton.textContent = 'Done';
    bookForm.appendChild(doneButton);

    bookForm.addEventListener('submit', () => {
        const title = titleInput.value;
        const author = authorInput.value;
        const pages = +pagesInput.value;
        const read = radioTrueInput.checked;

        addBooktoLibrary(title, author, pages, read);
        displayBooks();
        popUp.close();
    })

    popUp.showModal();






    
}


document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded. Initializing app."); // Debugging: Confirm DOM ready    
    // Ensure tableContainer exists before appending to it
    const tableContainer = document.createElement('div');
    tableContainer.id = 'booksTableContainer';
    document.body.appendChild(tableContainer);

    const newBookButton = document.createElement('button');
    newBookButton.addEventListener('click', newBookDialog);
    newBookButton.textContent = 'Add Book'
    document.body.appendChild(newBookButton);

    // Initial display of books
    addBooktoLibrary("Star Wars", "George Lucas", 346, false);
    addBooktoLibrary("The Hobbit", "J.R.R. Tolkein", 478, true);
    addBooktoLibrary("The Long Ships", "Frans Berggston", 503, true);

    displayBooks(); // Corrected: Call without argument
});


