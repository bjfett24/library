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
    const body = document.querySelector('body');
    const table = document.createElement('table');
    body.appendChild(table);

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
    }
}


addBooktoLibrary("Star Wars", "George Lucas", 346, false);
addBooktoLibrary("The Hobbit", "J.R.R. Tolkein", 478, true);
addBooktoLibrary("The Long Ships", "Frans Berggston", 503, true);


displayBooks(myLibrary);
