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

function addBooktoLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks(arr) {

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

    
    for (let book of arr) {
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
        newRead.textContent = book.read;
        newRow.appendChild(newRead);

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
    displayBooks(myLibrary);
}


function newBookDialog() {
    const popUp = document.createElement('dialog');
    popUp.closedby = 'any';
    document.body.appendChild(popUp);
    
    const dialogHead = document.createElement('div');
    dialogHead.textContent = 'Insert Book Information';
    popUp.appendChild(dialogHead);

    const bookForm = document.createElement('form');
    bookForm.action = '#';
    bookForm.method = 'dialog';
    popUp.appendChild(bookForm);

    const titleLabel = document.createElement('label');
    titleLabel.for = 'title';
    titleLabel.textContent = 'Book Title';
    bookForm.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    bookForm.appendChild(titleInput);

    const authorLabel = document.createElement('label');
    authorLabel.for = 'author';
    authorLabel.textContent = 'Author';
    bookForm.appendChild(authorLabel);

    const authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.id = 'author';
    bookForm.appendChild(authorInput);

    const pagesLabel = document.createElement('label');
    pagesLabel.for = 'pages';
    pagesLabel.textContent = 'Number of Pages';
    bookForm.appendChild(pagesLabel);

    const pagesInput = document.createElement('input');
    pagesInput.type = 'text';
    pagesInput.id = 'pages';
    bookForm.appendChild(pagesInput);

    const readLabel = document.createElement('label');
    readLabel.textContent = 'Have you read this book?';
    bookForm.appendChild(readLabel);
    
    const radioYes = document.createElement('div');
    radioYes.classList.add('radio-option');
    bookForm.appendChild(radioYes);
    
    
    const radioTrueLabel = document.createElement('label');
    radioTrueLabel.for = 'readTrue';
    radioTrueLabel.textContent = 'Yes';
    radioYes.appendChild(radioTrueLabel);

    const radioTrueInput = document.createElement('input');
    radioTrueInput.type = 'radio';
    radioTrueInput.id = 'readTrue';
    radioYes.appendChild(radioTrueInput);

    
    const radioNo = document.createElement('div');
    radioNo.classList.add('radio-option');
    bookForm.appendChild(radioNo);

    const radioFalseLabel = document.createElement('label');
    radioFalseLabel.for = 'readFalse';
    radioFalseLabel.textContent = 'No';
    radioNo.appendChild(radioFalseLabel);

    const radioFalseInput = document.createElement('input');
    radioFalseInput.type = 'radio';
    radioFalseInput.id = 'readFalse';
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
        displayBooks(myLibrary);
        popUp.close();
    })

    popUp.showModal();






    
}

const tableContainer = document.createElement('div');
    tableContainer.id = 'booksTableContainer';
    document.body.appendChild(tableContainer);

const newBookButton = document.createElement('button');
newBookButton.addEventListener('click', newBookDialog);
newBookButton.textContent = 'Add Book'
document.body.appendChild(newBookButton);




addBooktoLibrary("Star Wars", "George Lucas", 346, false);
addBooktoLibrary("The Hobbit", "J.R.R. Tolkein", 478, true);
addBooktoLibrary("The Long Ships", "Frans Berggston", 503, true);


displayBooks(myLibrary);
