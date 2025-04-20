import { useMemo } from 'react';
import { useBooks } from '../context/BookContext';

function useBookStats() {
  const { books } = useBooks();
  
  const stats = useMemo(() => {
    const totalBooks = books.length;
    const ownedBooks = books.filter(book => book.status === 'owned').length;
    const readingBooks = books.filter(book => book.status === 'reading').length;
    const toBuyBooks = books.filter(book => book.status === 'toBuy').length;
    
    const authorStats = books.reduce((acc, book) => {
      acc[book.author] = (acc[book.author] || 0) + 1;
      return acc;
    }, {});
    
    const topAuthor = Object.entries(authorStats)
      .sort((a, b) => b[1] - a[1])
      .map(([author, count]) => ({ author, count }))[0] || null;
    
    return {
      totalBooks,
      ownedBooks,
      readingBooks,
      toBuyBooks,
      percentageOwned: totalBooks ? Math.round((ownedBooks / totalBooks) * 100) : 0,
      percentageReading: totalBooks ? Math.round((readingBooks / totalBooks) * 100) : 0,
      percentageToBuy: totalBooks ? Math.round((toBuyBooks / totalBooks) * 100) : 0,
      topAuthor,
    };
  }, [books]);
  
  return stats;
}

export default useBookStats;

