function handleInput() {
    const inputText = document.getElementById('book_title').value;
    fetch(`/suggest?query=${inputText}`)
        .then(response => response.json())
        .then(data => {
            const suggestionsDiv = document.getElementById('suggestions');
            suggestionsDiv.innerHTML = '';
            data.forEach(book => {
                const suggestion = document.createElement('div');
                suggestion.textContent = book.title;
                suggestion.classList.add('suggestion');
                suggestion.addEventListener('click', () => {
                    document.getElementById('book_title').value = book.title;
                    suggestionsDiv.innerHTML = '';
                });
                suggestionsDiv.appendChild(suggestion);
            });
        });
}

document.addEventListener('DOMContentLoaded', function () {
    // Fetch popular books with images
    fetch('/popular')
        .then(response => response.json())
        .then(data => {
            const popularBooksDiv = document.getElementById('popular-books');
            data.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book-item');
                const img = document.createElement('img');
                img.src = book['Image-URL-M'];
                img.alt = book['Book-Title'];
                bookDiv.appendChild(img);

                const title = document.createElement('h4');
                title.textContent = book['Book-Title'];
                bookDiv.appendChild(title);

                const bookAuthor = document.createElement('p');
                bookAuthor.textContent = book['Book-Author'];
                bookDiv.appendChild(bookAuthor);

                popularBooksDiv.appendChild(bookDiv);
            });
        });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('recommendation-form');
    const input = document.getElementById('book_title');
    const recommendationsDiv = document.getElementById('recommendations');

    if (form && input && recommendationsDiv) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const bookTitle = input.value;

            fetch('/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ book_title: bookTitle })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);  // Debugging statement
                    recommendationsDiv.innerHTML = '';
                    data.forEach(book => {
                        const bookDiv = document.createElement('div');
                        bookDiv.className = 'books';
                        const bookTitleElem = document.createElement('h3');
                        bookTitleElem.textContent = `${book.title} `;
                        const bookAuthor = document.createElement('p');
                        bookAuthor.textContent = `Author: ${book.author}`;
                        const bookImage = document.createElement('img');
                        bookImage.src = book.image_url;
                        bookImage.alt = book.title;
                        bookDiv.appendChild(bookTitleElem);
                        bookDiv.appendChild(bookAuthor);
                        bookDiv.appendChild(bookImage);
                        recommendationsDiv.appendChild(bookDiv);
                    });
                });
        });
    } else {
        console.error("Form or input elements not found");
        console.log({ form, input, recommendationsDiv }); // Debugging statement
    }
});