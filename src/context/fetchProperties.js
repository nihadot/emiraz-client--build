import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Search Context
const SearchContext = createContext();

// Provider component
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle search
  const handleSearch = async (query) => {
    setLoading(true);
    setSearchQuery(query);

    try {
      const response = await fetch(`/search?query=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        loading,
        handleSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the search context
export const useSearch = () => {
  return useContext(SearchContext);
};
