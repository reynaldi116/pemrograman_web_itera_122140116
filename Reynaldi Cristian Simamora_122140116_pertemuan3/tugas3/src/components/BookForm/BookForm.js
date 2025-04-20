import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

const BookForm = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'toBuy', // Default status
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // If editing, populate form with book data
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        status: book.status || 'toBuy',
      });
    }
  }, [book]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        ...formData,
        id: book?.id, // Keep ID if it exists (for editing)
      });
      
      // Reset form if not editing
      if (!book) {
        setFormData({
          title: '',
          author: '',
          status: 'toBuy',
        });
      }
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{book ? 'Edit Book' : 'Add New Book'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={errors.author ? 'error' : ''}
        />
        {errors.author && <span className="error-text">{errors.author}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="owned">Owned</option>
          <option value="reading">Currently Reading</option>
          <option value="toBuy">Want to Buy</option>
        </select>
      </div>
      
      <div className="form-buttons">
        <button type="submit" className="btn primary">
          {book ? 'Update' : 'Add'} Book
        </button>
        {onCancel && (
          <button 
            type="button" 
            className="btn secondary" 
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

BookForm.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default BookForm;
