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

    while (table.rows.length > 0) {
        table.deleteRow(0);
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

//přihodit kontrolu codument load a převzat z url a zavolat filtr

// SEARCHING AND FILTERING STUFF
const url = new URL(window.location)
const params = url.searchParams;


const state = {
  year: params.get("year") ?? "all",
  month: params.get("month") ?? "all",
  search: params.get("search") ?? "",
};


function updateState(key, value) {
  state[key] = value;
  filter();
}


function onChangeYear(value){
    updateState("year", value)
}

function onChangeMonth(value){
    updateState("month", value)
}

function onChangeSearch(value){
    updateState("search", value)
}


function filter(){
    console.log("Running filter")

    const filteredBooks = {}

    for (const [id, book] of Object.entries(books)) {
        if (
            match(book.year_read, state.year)
            && match(book.month_read, state.month)
            && filterText(book, state.search)
        ) {
            filteredBooks[id] = book
        }
    }

    syncUrl()
    loadIntoTable(filteredBooks)

}

function match(value, selected){
    return selected === "all" || selected === value
}

function filterText(book, search){
    if (!search) return true
    const query = search.toLowerCase()
    return book.name.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
}


function syncUrl(){
    url.searchParams.set("year", state.year)
    url.searchParams.set("month", state.month)
    url.searchParams.set("search", state.search)

    window.history.pushState({}, '', url)
}

