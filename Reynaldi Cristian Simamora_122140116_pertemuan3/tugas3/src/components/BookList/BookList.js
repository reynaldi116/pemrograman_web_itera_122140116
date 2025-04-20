import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BookForm from '../BookForm/BookForm';
import './BookList.css';

const BookItem = ({ book, onEdit, onDelete }) => {
  const getStatusLabel = (status) => {
    switch (status) {
      case 'owned': return 'Owned';
      case 'reading': return 'Reading';
      case 'toBuy': return 'To Buy';
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'owned': return 'status-owned';
      case 'reading': return 'status-reading';
      case 'toBuy': return 'status-tobuy';
      default: return '';
    }
  };

  return (
    <div className="book-item">
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <span className={`book-status ${getStatusClass(book.status)}`}>
          {getStatusLabel(book.status)}
        </span>
      </div>
      <div className="book-actions">
        <button onClick={() => onEdit(book)} className="btn edit">
          Edit
        </button>
        <button onClick={() => onDelete(book.id)} className="btn delete">
          Delete
        </button>
      </div>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const BookList = ({ books, onUpdateBook, onDeleteBook }) => {
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleUpdate = (updatedBook) => {
    onUpdateBook(updatedBook);
    setEditingBook(null);
  };

  const handleCancel = () => {
    setEditingBook(null);
  };

  if (books.length === 0) {
    return <p className="no-books">No books found. Add some books to get started!</p>;
  }

  return (
    <div className="book-list">
      {editingBook && (
        <div className="edit-form-container">
          <BookForm 
            book={editingBook} 
            onSubmit={handleUpdate} 
            onCancel={handleCancel} 
          />
        </div>
      )}
      
      {books.map(book => (
        <BookItem
          key={book.id}
          book={book}
          onEdit={handleEdit}
          onDelete={onDeleteBook}
        />
      ))}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpdateBook: PropTypes.func.isRequired,
  onDeleteBook: PropTypes.func.isRequired,
};

export default BookList;

