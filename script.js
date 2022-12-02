'use strict';

let bookList = [];

window.addEventListener('load', () => {
  getAll().then((apiBooks) => (bookList = apiBooks));
});

searchField.addEventListener('keyup', (e) =>
  renderBookList(
    bookList.filter(({ title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);


const divhtml = `<div class="absolute bg-yellow-400" id="bookDetails">
                HEJ
                </div>`
//Hover event


document.getElementById("searchField").addEventListener("mouseout", function(){
  document.getElementById("searchField").style.backgroundColor = "white";
})


//render booklist
function renderBookList(bookList) {
  const existingElement = document.querySelector('.book-list');

  const root = document.getElementById('root');

 
  existingElement && root.removeChild(existingElement);
  bookList.length > 0 && searchField.value && root.insertAdjacentHTML('beforeend', BookList(bookList));

  // lägger in alla book-list item i en list
  const listOfBooks = document.querySelectorAll('.book-list__item');
  
  // för varje item i booklisten
  listOfBooks.forEach((item) =>{
    renderBookDetails(item);
  })
}

//renderar diven vid muspekaren när den hovrar över varje item
function renderBookDetails(item){
  item.addEventListener("mouseover", function(e){
    root.insertAdjacentHTML('beforeend', divhtml);
    let div = document.getElementById('bookDetails');
    let left = e.pageX + 50;
    let top = e.pageY + 50;
    div.style.left = left + 'px';
    div.style.top = top + 'px';
  })
  item.addEventListener("mouseout", function(){
    document.getElementById("bookDetails").remove();
  })
}






