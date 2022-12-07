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


const divstart = `<div class="bookDetails absolute bg-yellow-400 drop-shadow-xl" 
                      id="bookDetails"
                      style="width: 10vw;
                            height: 10vw;">
                HELLO WORLD`
                

const divend = `</div>`
let bookImg = `<img class='coverImg' src="`
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

  // lägger in alla book-list__item <li> i en list
  const listItems = document.querySelectorAll('.book-list__item');
  
  // för varje item i booklisten
  listItems.forEach((item) =>{
    renderBookDetails(item);
    //console.log(item);
  })
}

//renderar diven vid muspekaren när den hovrar över varje item
function renderBookDetails(item){
  
  item.addEventListener("mouseover", function(e){
    var target = e.target;
    //console.log(target.innerHTML);
    let details = target.innerHTML.split(" - ");
    const objectAuthor = details[0].trim();
    const objectTitle = details[1].trim();

    //let bookItem = getBook(e.target.id).then(result => getBook(e.target.id));
    for (let index = 0; index < bookList.length; index++){
      if (bookList[index].author == objectAuthor && bookList[index].title == objectTitle){
        //let target = e.target;
        //let bookItem = getBook(index).then((apiBooks) => (bookItem = apiBooks));
        
        //console.log(target)
        console.log("före getBooks");
        let bookItem = getBook(index).then((apiBooks) => (bookItem = apiBooks));
        console.log(bookItem);
        console.log("COVER " + bookItem);
        console.log("efter getBooks");
        bookImg = `<img class='coverImg' src="`;
        //bookImg += bookList[index].coverImage;
        bookImg += bookItem.coverImage;
        
        bookImg += `" alt="" srcset=""></img>`
      }
    }
    
    let divHTML = divstart + bookImg + divend;
    root.insertAdjacentHTML('beforeend', divHTML);

    let div = document.getElementById('bookDetails');
    let left = e.pageX + 25;
    let top = e.pageY + 25;
    div.style.left = left + 'px';
    div.style.top = top + 'px';
  

  })
  // Tar bort bookDetails när muspekaren lämnar list itemet 
  item.addEventListener("mouseout", function(){
    document.getElementById("bookDetails").remove();
  })
}

//hämtar boken från api:t baserat på id
async function getBook(bookId){
  const result = await fetch(url+`/${bookId}`).then((result) => result.json());


  return result;
}


//test
//console.log(getBook(1));








