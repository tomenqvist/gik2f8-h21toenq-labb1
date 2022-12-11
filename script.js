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
  
  item.addEventListener("mouseenter", function(e){
    var target = e.target;
    console.log(target);
    target.style.backgroundColor = "lavender";
    //Letar efter author och title i listelemenet och splittar dem
    let details = target.innerHTML.split(" - ");
    const objectAuthor = details[0].trim();
    const objectTitle = details[1].trim();


    //kollar om author och titel stämmer överens, om de gör de hämta bild och text baserat på id
    for (let index = 0; index < bookList.length; index++){
      if (bookList[index].author == objectAuthor && bookList[index].title == objectTitle){
        let bookItem = getBook(index + 1).then((bookID) => {
          // let divHTML = BookDetails(bookItem);
          let bookHtmlID = `bookDetails${bookID.id}`
          const divstart = `<div class="books absolute bg-gradient-to-tr from-purple-200 to-indigo-200 drop-shadow-xl" 
                      id="${bookHtmlID}"
                      style="max-width: 200px">`;
                
          
          console.log(bookHtmlID);
          // Bygger upp strängen för diven
          let bookDetailsHtml = `<img src="`;
          let image;
          if(bookID.coverImage === "" ){
            image = "/img/no_cover.svg";
          } else {
            image = bookID.coverImage
          }
          bookDetailsHtml += image;
          bookDetailsHtml += `" alt="" srcset=""></img>
                              <p>`;
          bookDetailsHtml += bookID.title;
          bookDetailsHtml += `</p>
                              <p>`;
          bookDetailsHtml += bookID.author;
          bookDetailsHtml += `</p>`;
          const divend = `</div>`
          let divHTML = divstart + bookDetailsHtml + divend;
          
          
          e.target.insertAdjacentHTML('beforeend', divHTML);
          
          // Bestämmer vart diven ska renderas
          let divElement = document.getElementById(bookHtmlID);
          
          let left = e.pageX + 25;
          let top = e.pageY + 25;
          divElement.style.left = left + 'px';
          divElement.style.top = top + 'px';
          
        }); //getBook funtion all end        
      } // if end
    } // for loop end
  }); //eventlistener mouseenter end
  
  // Tar bort bookdetails
  item.addEventListener("mouseout", function(e){
    let target = e.target;
    target.style.backgroundColor = "white";
    console.log(document.getElementsByClassName('books')[0]);
    // kör en loop och tar bort alla utifall buggen där en bok dröjer kvar (funkar
    // inte jättbra)
    for(let idx = 0; idx < bookList.length; idx++){
      let bookDetailsDiv = document.getElementsByClassName('books')[idx]
      if(bookDetailsDiv){
        bookDetailsDiv.remove();
      }
    }
  });// event listener mouseout end
} // renderBookDetails end