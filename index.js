console.log("JS happening");


let admin;
let books= {};

loadAdmin()

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

    const table = document.getElementById("table").getElementsByTagName("tbody")[0]

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }


    let i = 0;
    for (const key in books) {
        
        const row = table.insertRow(i);
        i++

        //adding "link" to the whole row, so you can click anywhere in said row to be taken to correct book
        row.onclick = () => {
        window.location = `book.html?id=${key}`;
        };


        //insertCell(x) x is given based on the column of the table the data is supposed to show in, don't change unless you are changing everything

        const year = row.insertCell(0)
        year.innerHTML = books[key].year_read || "???"

        const month = row.insertCell(1)
        month.innerHTML = translateMonth(books[key].month_read)

        const name = row.insertCell(2)
        name.innerHTML = books[key].name

        const author = row.insertCell(3)
        author.innerHTML = books[key].author
        
        const info = row.insertCell(4);
        info.innerHTML = `<a href='book.html?id=${key}' class='moreBtn'>more</a>`;

    }


}

let chosenYear = "all";
let chosenMonth = "all";
let search = "";

function onChangeYear(value){
    chosenYear = value;
    filter()
}

function onChangeMonth(value){
    chosenMonth = value;
    filter()
}

function onChangeSearch(value){
    search = value;
    filter()
}


//TODO uchovat filtry  v URL

function filter(){
    console.log("Running filter")
    //I'm trying to figure out a filter for my super duper object

    let filteredBooks = {}

    for (const [id, book] of Object.entries(books)) {
        if (filterYear(book.year_read) && filterMonth(book.month_read) && filterText(book.name, book.author)) {
            filteredBooks[id] = book
        }
    }

    loadIntoTable(filteredBooks)

    function filterYear(year){
        if (chosenYear === "all") return true;
        if (year === chosenYear) return true;
        return false
    }

    function filterMonth(month){
        if (chosenMonth === "all") return true;
        if (month === chosenMonth) return true;
        return false
    }

    function filterText(name, author) {
        return name.toLowerCase().includes(search.toLowerCase()) || author.toLowerCase().includes(search.toLowerCase())
    }

}

