console.log("JS happening");
const table = document.getElementById("table")

let admin;
let books= {};

async function loadAdmin() {
    try {
        const response = await fetch('admin.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        admin = await response.json();
        loadBooks(admin)
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

async function loadBooks(admin) {
    for (const book in admin) {
        try {
        const response = await fetch(`books/${admin[book]}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        books[book] = await response.json();

    } catch (error) {
        console.error("Error loading JSON:", error);
    }

    }
}

//Finish
function loadIntoTable(books){
    for (const book of books){

    }
}

loadAdmin()