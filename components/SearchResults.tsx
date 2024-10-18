'use client';

import NeumorphicBox from './NeumorphicBox';
import { SearchResult } from '../types';

interface SearchResultsProps {
  searchResults: SearchResult;
}

function SearchResults({ searchResults }: SearchResultsProps) {
  const getTotalCount = () => {
    return Object.values(searchResults).reduce((acc, curr) => acc + curr, 0);
  };

  return (
    <NeumorphicBox>
      <h2 className="text-2xl font-bold mb-6">검색 결과</h2>
      {Object.entries(searchResults).map(([boxType, count]) => (
        <div key={boxType} className="mb-3 p-4 bg-secondary rounded-lg neumorphic-inset">
          <p className="text-lg">
            {boxType} <span className="font-bold text-primary">x {count}개</span>
          </p>
        </div>
      ))}
      <hr className="my-6 border-gray-200" />
      <p className="font-bold text-xl text-primary">
        총합: {getTotalCount()}개
      </p>
    </NeumorphicBox>
  );
}

export default SearchResults;
