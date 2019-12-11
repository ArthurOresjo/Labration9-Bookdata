const apiUrl = "https://forverkliga.se/JavaScript/api/crud.php";
let myKey = "9EkMA";



window.addEventListener("load", () => { // Load

  
  
  
  
  let getKey = document.querySelector("#newkey")
  
  getKey.addEventListener("click", event => { // Genererar en API nyckel när någon trycker på knappen.
    fetch(apiUrl + "?requestKey")
      .then(response => response.json())
      .then(data => {
        let newKey = document.querySelector("#willshow");
        newKey.innerHTML = data.key;
      });
  })

  let login = document.querySelector("#login") // Uppdaterar värdet i variablen userKey till det som står i text fältet.
  
  login.addEventListener("click", event => {
    let newKey2 = document.querySelector("#newkey2").value;
    myKey = newKey2;
    
    
  })

  let save = document.querySelector("#save") // Hanterar det som händer när man trycker på lägg till bok knapppen.
  save.addEventListener("click", event => {
    let title = document.querySelector("#title").value
    let author = document.querySelector("#author").value
    addBooks(title, author, myKey)
  })

  let getBooks = document.querySelector("#get") // Hanterar det som händer när man trycker på Hämta böcker knappen.
    getBooks.addEventListener("click", event => {
    getBok(myKey, 5)
  })

}); // Load end

function addBooks(title, author, key) { // Funktion för att spara vår bok till servern.
  let url = `${apiUrl}?key=${key}&title=${title}&author=${author}&+op=insert&please`; //Lägger ihop en url med key och operation och variablarna för att skicka med title och author.
  fetch(url) // Skickar vår url till servern och tar sedan hand om svaret.
    .then(response => response.json())
    .then(data => {
      let addBook = document.querySelector("#ADDbook")
      addBook.innerHTML = "Book added";
      getBok(key, 5)
      
    });
}

function getBok(key, Try) { // Funktion för att hämta alla böcker som tillhör nyckeln.
  let url = `${apiUrl}?key=${key}&op=select`; // Lägger ihop en url med key och operation.
  let BookList = document.querySelector("#BookList");
  fetch(url) // Skickar vår url till servern och tar sedan hand om svaret.
    .then(response => response.json())
    .then(book => {
      if (book.status === "success") { // Kollar om vi lyckades hämta alla böcker.
        let Status = document.querySelector("#APIstatus");
        Status.innerHTML = "API sucsess";
        book.data.forEach(element => { // Loopar igenom vår array och lägger title och author i en ny li.
          let bookElement = document.createElement("li")
          bookElement.innerHTML = "Title: " + element.title + " Author: " + element.author;
          BookList.appendChild(bookElement);
          document.querySelector("li").value = "";
          
        });
      
      } else if (book.status === "error") { // Får vi tillbaka ett error hamnar vi här.
          let getBookStatus = document.querySelector("#APIstatus");
          getBookStatus.innerHTML = "API Error";
          
        if(Try >= 1) 
          getBok(key, Try-1)
        }
    })
}


