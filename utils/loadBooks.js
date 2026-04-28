async function loadBooks() {
    const books = {};
    try {
        const response = await fetch('admin.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const admin = await response.json();

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
        return books;
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}