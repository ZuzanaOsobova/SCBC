console.log("We are booking")

const url = new URL(window.location)
const params = url.searchParams;
const id = params.get("id")


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
    document.getElementById("year").innerText = book.year_read || "???"
    document.getElementById("month").innerText = translateMonth(book.month_read)
    document.getElementById("recommendedBy").innerText = book.recommended_by

    document.getElementById("genre").innerText = book.genre.map(book => " " + book )

    document.getElementById("description").innerText = book.book_description
    document.getElementById("thoughts").innerText = book.club_thoughts

    document.getElementById("cover").src = "images/covers/" + book.cover
    document.getElementById("cover").alt = book.name + " cover."
}