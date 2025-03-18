import React, { useState } from 'react';

interface TopAppBarProps {
  onSearch: (query: string) => void;
  onTabChange: (department: string) => void;
  onSort: () => void;
}

const TopAppBar: React.FC<TopAppBarProps> = ({ onSearch, onTabChange, onSort }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
      <button onClick={onSort}>Sort</button>
      <div>
        <button onClick={() => onTabChange('all')}>All</button>
        <button onClick={() => onTabChange('frontend')}>Frontend</button>
      </div>
    </div>
  );
};

export default TopAppBar;