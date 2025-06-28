"use client"; // Required for interactivity in Next.js 13+

import { useState, useRef, useEffect } from 'react';

export default function SearchButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add your search logic here
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div 
      ref={searchContainerRef}
      className=" top-10 left-4 z-50 flex items-center lg:hidden"
    >
      <button
        onClick={toggleSearch}
        className={`w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md transition-all duration-300 hover:bg-blue-600 ${
          isExpanded ? 'rotate-90' : ''
        }`}
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      <form onSubmit={handleSearch} className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`h-10 bg-white rounded-full shadow-md transition-all duration-300 outline-none ${
            isExpanded ? 'w-48 px-4 ml-2 opacity-100' : 'w-0 opacity-0'
          }`}
          placeholder="Search..."
        />
      </form>
    </div>
  );
}