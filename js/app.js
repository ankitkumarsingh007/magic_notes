 console.log("Welcome to notes app. This is app.js");
 showNotes();

 // If user adds a note, add it to the localStorage
 let addBtn = document.getElementById("addBtn");
 addBtn.addEventListener("click", function(e) {
     let addTxt = document.getElementById("addTxt");
     let notes = localStorage.getItem("notes");
     if (notes == null) {
         notes = [];
     } else {
         notes = JSON.parse(notes);
     }
     notes.push(addTxt.value);
     localStorage.setItem("notes", JSON.stringify(notes));
     addTxt.value = "";
     showNotes();
 });

 // Function to show elements from localStorage
 function showNotes() {
     let notes = localStorage.getItem("notes");
     if (notes == null) {
         notes = [];
     } else {
         notes = JSON.parse(notes);
     }
     let html = "";
     notes.forEach(function(element, index) {
         html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 id="card-title">Note ${index + 1}</h5>
                        <p class="cardTxt"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
     });
     let notesElm = document.getElementById("notes");
     if (notes.length != 0) {
         notesElm.innerHTML = html;
     } else {
         notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
     }
 }

 // Function to delete a note
 function deleteNote(index) {
     let notes = localStorage.getItem("notes");
     if (notes == null) {
         notes = [];
     } else {
         notes = JSON.parse(notes);
     }

     notes.splice(index, 1);
     localStorage.setItem("notes", JSON.stringify(notes));
     showNotes();
 }

 let search = document.getElementById('searchTxt');
 search.addEventListener("input", function() {

     let inputVal = search.value.toLowerCase();
     let noteCards = document.getElementsByClassName('noteCard');
     Array.from(noteCards).forEach(function(element) {
         let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
         //here any other query selector is not working efficiently
         if (cardTxt.includes(inputVal)) {
             element.style.display = "block";
         } else {
             element.style.display = "none";
         }
     })
 })