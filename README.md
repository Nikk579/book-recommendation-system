# Book Recommendation System

This project implements a Book Recommendation System using two approaches: popularity-based recommendation and collaborative filtering. 
It uses Flask for the backend web application and provides a simple interface for users to get book recommendations based on their input.

## Features

- **Popularity-Based Recommendation:**
  - Recommends popular books based on predefined metrics.
  - Displays book titles, authors, and images.

- **Collaborative Filtering:**
  - Recommends books similar to a user-provided book title using collaborative filtering.
  - Displays recommended book titles, authors, and images.

- **Suggest and Popular Endpoints:**
  - `/suggest`: Provides suggestions as the user types in the book title.
  - `/popular`: Lists popular books with images.

## Files Included

- **app.py**: Flask application that serves the recommendation endpoints.
- **index.html**: HTML template for the frontend user interface.
- **styles.css**: CSS file for styling the HTML template.
- **models/**:
  - **popular.pkl**: Pickled DataFrame of popular books data.
  - **book_pivot.pkl**: Pickled pivot table used for collaborative filtering.
  - **books.pkl**: Pickled DataFrame containing book details.
  - **similarity_scores.pkl**: Pickled similarity scores used in collaborative filtering.

## Requirements

Ensure you have Python and Flask installed. Install dependencies using:
```bash
pip install -r requirements.txt
```
## Usage 
Clone the repository:

```bash
git clone https://github.com/Nikk579/book-recommendation-system.git
cd book-recommendation-system
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the Flask application:

```bash
python app.py
```

Steps to use : 

1.Enter a book title in the input field and click "Get Recommendations" to see collaborative filtering recommendations.<br>

2.As you type, suggestions will appear based on the popularity-based approach.<br>

3.Scroll down to view popular books listed on the homepage.<br>

## Contributing
Contributions are welcome! Please fork the repository and create a pull request for any improvements or fixes.
Specificlly want more attractive UI and that serves best and smooth user experience. 
