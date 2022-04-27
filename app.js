const bookForm = document.querySelector('#book_form');
const bookContainer = document.querySelector('.books');

let bookList = [];
// GET BOOKS FROM LOCAL STORAGE
const getData = () => {
  const data = localStorage.getItem('books');
  if (data) {
    const parsedData = JSON.parse(data);
    bookList = parsedData;
    bookContainer.innerHTML = parsedData.map((book) => `
                <h3>${book.titleInput}</h3>
                <p>${book.authorInput}</p>
                <button type="button"  onclick='deleteBook(${book.id})'>Remove</button>
            <hr>
            `).join('');
  }
};
// ADD BOOKS FROM LOCAL STORAGE
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleInput = document.getElementById('title').value;
  const authorInput = document.getElementById('author').value;
  const id = Math.floor(Math.random() * 1000);
  const book = { id, titleInput, authorInput };
  bookList.push(book);
  // console.log(bookList);
  localStorage.setItem('books', JSON.stringify(bookList));
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  getData();
});
const deleteBook = (id) => {
  if (id === null) return;
  const dataToFilter = bookList.filter((book) => book.id !== id);
  localStorage.setItem('books', JSON.stringify(dataToFilter));
  getData();
};

window.addEventListener('load', () => {
  getData();
  deleteBook();
});
