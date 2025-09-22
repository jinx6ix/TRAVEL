"use client";

import { useState, useRef, useEffect } from "react";

export default function SearchButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<
    { id: number; title: string; slug: string; image: string; price: string }[]
  >([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => setIsExpanded((prev) => !prev);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // ✅ GA4 event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "search", {
        search_term: searchQuery,
      });
    }

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Autofocus when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div
      ref={searchContainerRef}
      role="search"
      className="relative top-10 left-4 z-50 flex flex-col lg:hidden"
    >
      {/* Toggle Button */}
      <button
        title="Toggle search"
        onClick={toggleSearch}
        aria-label="Toggle search"
        aria-expanded={isExpanded}
        className={`w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md transition-transform duration-300 hover:bg-blue-600 ${
          isExpanded ? "rotate-90" : ""
        }`}
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

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          ref={inputRef}
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search site content"
          className={`h-10 bg-white rounded-full shadow-md outline-none transition-all duration-300 ${
            isExpanded
              ? "max-w-xs px-4 ml-2 opacity-100"
              : "max-w-0 px-0 opacity-0"
          }`}
          placeholder="Search..."
        />
      </form>

      {/* Results Dropdown */}
      {results.length > 0 && (
        <ul className="absolute top-14 left-0 w-72 bg-white shadow-lg rounded-md p-2 z-50 max-h-64 overflow-y-auto">
          {results.map((r) => (
            <li key={r.id} className="flex items-center gap-2">
              <img
                src={r.image}
                alt={r.title}
                className="w-12 h-12 rounded object-cover"
              />
              <a
                href={r.slug}
                className="flex-1 block px-2 py-1 hover:bg-gray-100 rounded"
              >
                <span className="font-medium">{r.title}</span>
                <span className="block text-sm text-gray-500">{r.price}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
