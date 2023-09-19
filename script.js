showNotes();

const btnCreate = document.getElementById("btnCreate");

btnCreate.addEventListener("click", (e) => {

    let addHeading = document.getElementById("addHeading");
    let addTxt = document.getElementById("addTxt");

    if (addHeading.value == "") {
        // addHeading.style.boxShadow = "0 0 5px red";
        addHeading.setAttribute("placeholder", "Enter heading");
    }
    if (addTxt.value == "") {
        // addTxt.style.boxShadow = "0 0 5px red";
        addTxt.setAttribute("placeholder", "write some notes compulsary");
    }
    else {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }

        let myObj = {
            heading: addHeading.value,
            text: addTxt.value
        }
        // notesObj.push(addTxt.value);
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        addHeading.value = "";
        addHeading.setAttribute("placeholder", "Heading");
        addTxt.setAttribute("placeholder", "write some notes here");
        showNotes();
    }

});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    const date = new Date();
    notesObj.forEach(function (element, index) {
        html += `
            <div class="card col-lg-2 col-md-5 col-sm-8 col-8 my-3 mx-3">
                <div class="card-body">
                    <button id="${index}" class="btnDelete" onClick="deleteNote(${index})">
                    <img src="delete.svg">
                    </button>
                    <h5 class="card-title" contenteditable="true">${element.heading}</h5>
                    <hr>
                    <p class="card-text" contenteditable="true" id="txt">${element.text}</p>
                    <hr>
                    <span>${date.getDate()}-${date.getMonth()}-${date.getFullYear()}</span>
                </div>
            </div>
        `;

    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `
            <h1>Nothing to show pls add notes</h1>
        `;
    }
};

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


const deleteAll = document.getElementById("deleteAll");

deleteAll.addEventListener("click", () => {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.clear();
    showNotes();
});

const searchTxt = document.getElementById("searchTxt");

searchTxt.addEventListener("input", () => {
    let inputValue = searchTxt.value;

    let noteCard = document.getElementsByClassName("card");

    Array.from(noteCard).forEach((element) => {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardTitle = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputValue) || cardTitle.includes(inputValue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});