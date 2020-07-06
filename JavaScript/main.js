// const TypeWriter = function (txtElement, words, wait=3000) {
//     this.txtElement = txtElement;
//     this.words = words;
//     this.txt = '';
//     this.wordIndex = 0;
//     this.wait = parseInt(wait, 10);
//     this.type();
//     this.isDeleting = false;
// }

// // Type Method
// TypeWriter.prototype.type = function(){

//     // cuurent index of wod
//     const current = this.wordIndex %  this.words.length;
    
//     // Get full text of current word
//     const fullTxt = this.words[current];
//     console.log(fullTxt);

//     // Check if deleting
//     if(this.isDeleting){
//         // remove char
//         this.txt = fullTxt.substring(0, this.txt.length - 1);

//     } else {
//         // Add char
//         this.txt = fullTxt.substring(0, this.txt.length + 1);
//     }

//     // INsert txt into element
//     this.txtElement.innerHTML = `<span class=txt>${this.txt}</span>`;
    
//     // initial Type Speed
//     let typeSpeed = 300;

//     if(this.isDeleting) {
//         typeSpeed /= 2;
//     }

//     // If word is complete
//     if(!this.isDeleting && this.txt===fullTxt) {
//         // Pause
//         typeSpeed = this.wait;
//         // set delete to true
//         this.isDeleting = true;
//     } else if (this.isDeleting && this.txt == ''){
//         this.isDeleting = false;
//         // Move to next word
//         this.wordIndex++;
//         // Paues before start typing
//         this.type = 500;
//     }
//     setTimeout( () => this.type(), typeSpeed);
// }


// ES6 Class
class TypeWriter {
    constructor(txtElement, words, wait=3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type(){
        // cuurent index of wod
        const current = this.wordIndex %  this.words.length;
        
        // Get full text of current word
        const fullTxt = this.words[current];
        console.log(fullTxt);

        // Check if deleting
        if(this.isDeleting){
            // remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);

        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // INsert txt into element
        this.txtElement.innerHTML = `<span class=txt>${this.txt}</span>`;
        
        // initial Type Speed
        let typeSpeed = 300;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if(!this.isDeleting && this.txt===fullTxt) {
            // Pause
            typeSpeed = this.wait;
            // set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt == ''){
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Paues before start typing
            typeSpeed = 500;
        }
        setTimeout( () => this.type(), typeSpeed);
    }
}

// Init on DOM load
document.addEventListener('DOMContentLoaded', init);

// init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // inin TypeWriter
    new TypeWriter(txtElement, words, wait);
}

/* ------------ Form Field Section ------------------ */

// Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class
class UI{

    // display books
    static displayBooks() {

        const books = Store.getBooks();

        books.forEach( (book) => UI.addBookToList(book));
    }

    // add book to list
    static addBookToList(book) {
        const list = document.querySelector('.table-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete del-btn">X<a></td>
            `;
        list.appendChild(row);
    }

    // Show Alert
    static showAlert(message, status) {
        const div = document.createElement('div');
        div.className = `alert alert-${status} `;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.entry');
        const form = document.querySelector('#form');

        container.insertBefore(div, form);

        setTimeout (() => {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    // Clear Fileds
    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    // delete book from list
    static removeBook(el){
        el.parentElement.parentElement.remove();
    }
}

// Store Class
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') ===  null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static deleteBook(isbn) {
        const books =Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Events: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add Books
document.querySelector('#form').addEventListener('submit', (e) => {
    //  Prevent Actual Submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title == '' || author == '' || isbn == '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instatiate Book
        const book = new Book(title, author, isbn);

        // Add book to UI
        UI.addBookToList(book);

        //  Add Book to Store
        Store.addBook(book);

        // show success
        UI.showAlert('Book Added', 'success');

        // clearFileds
        UI.clearFields();
    }

})

// Event: Delete Book
document.querySelector('.table-list').addEventListener('click', (e) => {
    UI.removeBook(e.target);

    // Alert for remove book
    UI.showAlert('Book removed', 'success');

    // remove book from store
    Store.deleteBook(e.target.parentElement.previousElementSibling.textContent);
})

/* ------x----- Form Field Section --------x--------- */