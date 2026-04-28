console.log("Stats happening");

let books;

init()

async function init() {
    try {
        books = await loadBooks()
        loadStats(books)
    } catch (error) {
        console.error("Error loading JSON:", error)
    }
}

function loadStats(books) {

    const numBooks = document.getElementById("booksNumber")
    numBooks.innerText = Object.keys(books).length + " books"

    //Getting most read genre
    const genres = {};

    for (const key in books){
        books[key].genre.forEach((genre) => {

            if (genre in genres) {
                genres[genre]++
            } else {
                genres[genre] = 1;
            }

        })
    }

    const mostRead = Object.keys(genres).reduce((a, b) => genres[a] > genres[b] ? a : b);

    const mostGenre = document.getElementById("genres")
    mostGenre.innerText = `${mostRead} (${genres[mostRead]} books)`


    const sid = document.getElementById("sid")
    let num = 0;

    for (const key in books) {
        if ( books[key].recommended_by === "Sid having a role") num++
    }
    sid.innerText = num
}