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


const divstart = `<div class="absolute bg-green-400 drop-shadow-xl" 
                      id="bookDetails"
                      style="max-width: 30vw;">`;
                

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
  })
}

//renderar diven vid muspekaren när den hovrar över varje item
function renderBookDetails(item){
  
  item.addEventListener("mouseover", function(e){
    var target = e.target;

    //Letar efter author och title i listelemenet och splittar dem
    let details = target.innerHTML.split(" - ");
    const objectAuthor = details[0].trim();
    const objectTitle = details[1].trim();


    //kollar om author och titel stämmer överens, om de gör de hämta bild och text baserat på id
    for (let index = 0; index < bookList.length; index++){
      if (bookList[index].author == objectAuthor && bookList[index].title == objectTitle){

        console.log("före getBooks");
        let bookItem = getBook(index + 1).then((bookID) => {
          let bookDetailsHtml = `<img class='coverImg' src="`;
          bookDetailsHtml += bookID.coverImage;
          bookDetailsHtml += `" alt="" srcset=""></img>`;
          bookDetailsHtml += `<p>`;
          bookDetailsHtml += bookID.title;
          bookDetailsHtml += `</p>`;
          bookDetailsHtml += `<p>`;
          bookDetailsHtml += bookID.author;
          bookDetailsHtml += `</p>`;
          let divHTML = divstart + bookDetailsHtml + divend;
          root.insertAdjacentHTML('beforeend', divHTML);
          console.log(bookImg)

          // Bestämmer vart diven ska renderas
          let div = document.getElementById('bookDetails');
          let left = e.pageX + 25;
          let top = e.pageY + 25;
          div.style.left = left + 'px';
          div.style.top = top + 'px';
        });
      }
    }
    
    

    

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








