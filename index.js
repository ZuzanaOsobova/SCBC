console.log("JS happening");


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
    loadIntoTable(books)
}


function loadIntoTable(books){
    console.log(books)

    const table = document.getElementById("table")

    for (const key in books) {
        
        const row = table.insertRow(key);

        //adding "link" to the whole row, so you can click anywhere in said row to be taken to correct book
        row.onclick = () => {
        window.location = `book.html?id=${key}`;
        };


        //insertCell(x) x is given based on the column of the table the data is supposed to show in, don't change unless you are changing everything

        const year = row.insertCell(0)
        year.innerHTML = books[key].year_read

        const month = row.insertCell(1)
        month.innerHTML = books[key].month_read

        const name = row.insertCell(2)
        name.innerHTML = books[key].name

        const author = row.insertCell(3)
        author.innerHTML = books[key].author
        
        const info = row.insertCell(4);
        info.innerHTML = `<a href='book.html?id=${key}' class='moreBtn'>more</a>`;

    }


}

loadAdmin()