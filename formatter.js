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
        genre: chosenGenres,
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

    chosenGenres.splice(0, chosenGenres.length)

    document.getElementById("description").value = "";
    document.getElementById("thoughts").value = "";
    document.getElementById("cover").value = "";
    document.getElementById("JSONAnswer").value = "";
}

const chosenGenres = [];

function addGenre(){
    const genre = document.getElementById("genre").value
    if(genre.trim() && !chosenGenres.includes(genre)) {
        chosenGenres.push(genre.trim())
        renderGenres()       
        document.getElementById("genre").value = "" 
    }
}

function renderGenres(){

    const genresDiv = document.getElementById("chosenGenres")
    genresDiv.innerHTML = ""

    chosenGenres.forEach((genre) => {
        const child = document.createElement("span");
        child.className = "singleGenre";
        child.textContent = genre + " ";

        const deleteBtn = document.createElement("span");
        deleteBtn.className = "deleteBtn";
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => deleteGenre(genre);

        child.appendChild(deleteBtn);
        genresDiv.appendChild(child);
    });

}

function deleteGenre(value){
    const index = chosenGenres.indexOf(value)
    chosenGenres.splice(index,1)

    renderGenres()

}