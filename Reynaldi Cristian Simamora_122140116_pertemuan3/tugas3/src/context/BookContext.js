import React, { createContext, useContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Initial state
const initialState = {
  books: [],
  filter: 'all',
  searchTerm: '',
};

// Create context
const BookContext = createContext();

// Reducer function
const bookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map(book => 
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

// Provider component
export const BookProvider = ({ children }) => {
  const [storedBooks, setStoredBooks] = useLocalStorage('books', []);
  const [state, dispatch] = useReducer(bookReducer, { 
    ...initialState,
    books: storedBooks,
  });

  // Sync with localStorage when books change
  useEffect(() => {
    setStoredBooks(state.books);
  }, [state.books, setStoredBooks]);

  // Add a new book
  const addBook = (book) => {
    dispatch({
      type: 'ADD_BOOK',
      payload: { ...book, id: Date.now().toString() },
    });
  };

  // Update a book
  const updateBook = (book) => {
    dispatch({
      type: 'UPDATE_BOOK',
      payload: book,
    });
  };

  // Delete a book
  const deleteBook = (id) => {
    dispatch({
      type: 'DELETE_BOOK',
      payload: id,
    });
  };

  // Set filter
  const setFilter = (filter) => {
    dispatch({
      type: 'SET_FILTER',
      payload: filter,
    });
  };

  // Set search term
  const setSearchTerm = (term) => {
    dispatch({
      type: 'SET_SEARCH',
      payload: term,
    });
  };

  // Get filtered books
  const getFilteredBooks = () => {
    return state.books
      .filter(book => {
        if (state.filter === 'all') return true;
        return book.status === state.filter;
      })
      .filter(book => {
        if (!state.searchTerm) return true;
        const searchLower = state.searchTerm.toLowerCase();
        return (
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower)
        );
      });
  };

  const value = {
    books: state.books,
    filter: state.filter,
    searchTerm: state.searchTerm,
    addBook,
    updateBook,
    deleteBook,
    setFilter,
    setSearchTerm,
    getFilteredBooks,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

// Custom hook to use the book context
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};