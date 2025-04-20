import { renderHook } from '@testing-library/react-hooks';
import useBookStats from './useBookStats';
import { useBooks } from '../context/BookContext';

// Mock the useBooks hook
jest.mock('../context/BookContext', () => ({
  useBooks: jest.fn(),
}));

describe('useBookStats Hook', () => {
  test('calculates stats correctly with empty books array', () => {
    useBooks.mockReturnValue({
      books: [],
    });
    
    const { result } = renderHook(() => useBookStats());
    
    expect(result.current).toEqual({
      totalBooks: 0,
      ownedBooks: 0,
      readingBooks: 0,
      toBuyBooks: 0,
      percentageOwned: 0,
      percentageReading: 0,
      percentageToBuy: 0,
      topAuthor: null,
    });
  });
  
  test('calculates stats correctly with books data', () => {
    useBooks.mockReturnValue({
      books: [
        { id: '1', title: 'Book 1', author: 'Author A', status: 'owned' },
        { id: '2', title: 'Book 2', author: 'Author B', status: 'reading' },
        { id: '3', title: 'Book 3', author: 'Author A', status: 'toBuy' },
        { id: '4', title: 'Book 4', author: 'Author A', status: 'owned' },
      ],
    });
    
    const { result } = renderHook(() => useBookStats());
    
    expect(result.current).toEqual({
      totalBooks: 4,
      ownedBooks: 2,
      readingBooks: 1,
      toBuyBooks: 1,
      percentageOwned: 50,
      percentageReading: 25,
      percentageToBuy: 25,
      topAuthor: { author: 'Author A', count: 3 },
    });
  });
  
  test('calculates correct percentages with non-integer results', () => {
    useBooks.mockReturnValue({
      books: [
        { id: '1', title: 'Book 1', author: 'Author A', status: 'owned' },
        { id: '2', title: 'Book 2', author: 'Author B', status: 'reading' },
        { id: '3', title: 'Book 3', author: 'Author C', status: 'toBuy' },
      ],
    });
    
    const { result } = renderHook(() => useBookStats());
    
    expect(result.current).toEqual({
      totalBooks: 3,
      ownedBooks: 1,
      readingBooks: 1,
      toBuyBooks: 1,
      percentageOwned: 33,  // 33.33...% rounded to 33%
      percentageReading: 33,
      percentageToBuy: 33,
      topAuthor: { author: 'Author A', count: 1 },  // All authors have 1 book
    });
  });
});

