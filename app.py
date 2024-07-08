from flask import Flask, request, render_template, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the models and books data
popular_df = pickle.load(open('models/popular.pkl', 'rb'))
book_pivot = pickle.load(open('models/book_pivot.pkl', 'rb'))
books = pickle.load(open('models/books.pkl', 'rb'))
similarity_scores = pickle.load(open('models/similarity_scores.pkl', 'rb'))


def get_popular_books_with_images():
    popular_books = popular_df[['Book-Title', 'Book-Author']].head(10)
    popular_books['Image-URL-M'] = popular_books['Book-Title'].apply(lambda title: books[books['Book-Title'] == title]['Image-URL-M'].iloc[0] if len(books[books['Book-Title'] == title]) > 0 else '')
    return popular_books.to_dict(orient='records')


def recommend(book_name):
    try:
        index = np.where(book_pivot.index == book_name)[0][0]
    except IndexError:
        print(f"Book title '{book_name}' not found in the dataset.")
        return []
    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:6]
    
    data = []
    for i in similar_items:
        item = {}
        temp_df = books[books['Book-Title'] == book_pivot.index[i[0]]]
        item['title'] = list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values)[0]
        item['author'] = list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values)[0]
        item['image_url'] = list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values)[0]
        
        data.append(item)
    
    return data


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    book_title = data['book_title']
    recommendations = recommend(book_title)
    print(recommendations)  # Debugging statement
    return jsonify(recommendations)

@app.route('/suggest')
def suggest():
    query = request.args.get('query')
    if query:
        matched_books = [{'title': book} for book in book_pivot.index if query.lower() in book.lower()]
        return jsonify(matched_books[:5])  # Limit suggestions to 5
    else:
        return jsonify([])

@app.route('/popular')
def popular():
    popular_books = get_popular_books_with_images()
    return jsonify(popular_books)


if __name__ == '__main__':
    app.run(debug=True)