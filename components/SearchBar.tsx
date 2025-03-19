import { useState } from 'react';

export const SearchBar = ({ onSearch }: { onSearch: (term: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <input
      type="text"
      placeholder="Search ideas..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
      }}
      className="w-full p-2 border rounded my-4"
    />
  );
};