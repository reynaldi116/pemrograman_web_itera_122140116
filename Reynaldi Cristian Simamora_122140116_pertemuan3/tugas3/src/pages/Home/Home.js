import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import './Home.css';

const Home = () => {
  const { 
    filter, 
    searchTerm, 
    setFilter, 
    setSearchTerm, 
    addBook, 
    updateBook, 
    deleteBook, 
    getFilteredBooks 
  } = useBooks();
  
  const [showForm, setShowForm] = useState(false);
  
  const handleAddBook = (book) => {
    addBook(book);
    setShowForm(false);
  };
  
  const filteredBooks = getFilteredBooks();
  
  return (
    <div className="home-page">
      <div className="actions-bar">
        <h2>My Book Collection</h2>
        <button 
          className="btn primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add New Book'}
        </button>
      </div>
      
      {showForm && (
        <div className="add-form-container">
          <BookForm 
            onSubmit={handleAddBook} 
            onCancel={() => setShowForm(false)} 
          />
        </div>
      )}
      
      <BookFilter 
        filter={filter}
        searchTerm={searchTerm}
        onFilterChange={setFilter}
        onSearchChange={setSearchTerm}
      />
      
      <div className="books-container">
        <BookList 
          books={filteredBooks} 
          onUpdateBook={updateBook} 
          onDeleteBook={deleteBook} 
        />
      </div>
    </div>
  );
};

export default Home;