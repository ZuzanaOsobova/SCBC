console.log("Formating prepared")

document.getElementById("year").value = new Date().getFullYear()

let books;

init()

async function init() {
    try {
        books = await loadBooks()
        createDatalist(books, "genre", "genre-list")
        createDatalist(books, "author" ,"author-list")
        createDatalist(books, "recommended_by", "recommended-list")
    } catch (error) {
        console.error("Error loading JSON:", error)
    }
}

function createDatalist(books, attribute , id){
    const data = new Set()

    for (const book in books) {

        if (Array.isArray(books[book][attribute])) {
            books[book][attribute].forEach(element => {
            data.add(element)
            });
        } else {
            data.add(books[book][attribute])
        }
        

    }

    const datalist = document.getElementById(id)

    data.forEach((element) => {
        const child = document.createElement("option")
        child.value = element
        datalist.appendChild(child)
    })

}


function format(){
    console.log("Formatting")

    const name = document.getElementById("name").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const recommendedBy = document.getElementById("recommendedBy").value;


    //todo make array
    const genre = document.getElementById("genre").value;


    const description = document.getElementById("description").value;
    const thoughts = document.getElementById("thoughts").value;
    const cover = document.getElementById("cover").value;


    const answer = document.getElementById("JSONAnswer")
    answer.value = JSON.stringify({
        name: name,
        author: author,
        year: year,
        month: month,
        recommendedBy: recommendedBy,
        genre: genre,
        description: description,
        thoughts: thoughts,
        cover: cover
    });

    console.log(answer.value)
    
}

function clearForm(){
    console.log("Clearing")
    document.getElementById("name").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";
    document.getElementById("month").value = "";
    document.getElementById("recommendedBy").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("description").value = "";
    document.getElementById("thoughts").value = "";
    document.getElementById("cover").value = "";
    document.getElementById("JSONAnswer").value = "";
}