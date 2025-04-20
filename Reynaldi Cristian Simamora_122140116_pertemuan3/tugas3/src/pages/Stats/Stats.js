import React from 'react';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

const Stats = () => {
  const stats = useBookStats();
  
  const StatCard = ({ title, value, color }) => (
    <div className={`stat-card ${color}`}>
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
  );
  
  return (
    <div className="stats-page">
      <h2>Book Collection Statistics</h2>
      
      <div className="stats-grid">
        <StatCard 
          title="Total Books" 
          value={stats.totalBooks} 
          color="total" 
        />
        <StatCard 
          title="Owned Books" 
          value={`${stats.ownedBooks} (${stats.percentageOwned}%)`} 
          color="owned" 
        />
        <StatCard 
          title="Currently Reading" 
          value={`${stats.readingBooks} (${stats.percentageReading}%)`} 
          color="reading" 
        />
        <StatCard 
          title="To Buy" 
          value={`${stats.toBuyBooks} (${stats.percentageToBuy}%)`} 
          color="tobuy" 
        />
      </div>
      
      {stats.topAuthor && (
        <div className="top-author-section">
          <h3>Top Author</h3>
          <p>{stats.topAuthor.author} ({stats.topAuthor.count} books)</p>
        </div>
      )}
      
      {stats.totalBooks === 0 && (
        <div className="no-stats">
          <p>Add some books to see your statistics!</p>
        </div>
      )}
    </div>
  );
};

export default Stats;
