 console.log("Welcome to notes app. This is app.js");
 showNotes();

 // If user adds a note, add it to the localStorage
 let addBtn = document.getElementById("addBtn");
 addBtn.addEventListener("click", function() {
     let addTxt = document.getElementById("addTxt");
     let addTitle = document.getElementById("addTitle");
     let notes = localStorage.getItem("notes");
     if (notes == null) {
         notes = [];
     } else {
         notes = JSON.parse(notes);
     }
     let obj = {
         title: addTitle.value,
         text: addTxt.value
     }
     notes.push(obj);
     localStorage.setItem("notes", JSON.stringify(notes));
     addTxt.value = "";
     addTitle.value = "";
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
                        <h5 id="card-title">${element.title}</h5>
                        <p class="cardTxt"> ${element.text}</p>

<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Delete Note
</button>

<div class="modal fade additional" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
        Do you want to delete it?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
        <button type="button" id="${index}" onclick="deleteNote(this.id)" data-dismiss="modal" class="btn btn-primary">Yes</button>
      </div>
    </div>
  </div>
</div>
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
         let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
         let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
         //here any other query selector is not working efficiently
         if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
             element.style.display = "block";
         } else {
             element.style.display = "none";
         }
     })
 })
