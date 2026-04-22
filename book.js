console.log("We are booking")

const query = window.location.search

//finds part of the query which happens after id=, if some more query parts would be added in future, gotta add, where the string should be closed (usually find the next query part)
const id = query.substring(query.indexOf("id=")+3)

console.log(id)

loadBook(id)

async function loadBook(id) {
        try {
            const response = await fetch(`books/${id}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const book = await response.json();
            console.log(book)

            displayBook(book)

            } catch (error) {
                console.error("Error loading JSON:", error);
        }
    
}


function displayBook(book){
    document.getElementById("name").innerText = book.name
    document.getElementById("author").innerText = book.author
    document.getElementById("year").innerText = book.year_read
    document.getElementById("month").innerText = translateMonth(book.month_read)
    document.getElementById("recommendedBy").innerText = book.recommended_by

    document.getElementById("genre").innerText = book.genre.map(book => " " + book )

    document.getElementById("description").innerText = book.book_description
    document.getElementById("thoughts").innerText = book.club_thoughts

    document.getElementById("cover").src = "images/" + book.cover
    document.getElementById("cover").alt = book.name + " cover."
}