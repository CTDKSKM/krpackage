'use client';

import React from 'react';
import NeumorphicBox from './NeumorphicBox';

interface SearchHistoryProps {
  searchHistory: Array<{modelName: string, boxType: string}>;
  onRemove: (index: number) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ searchHistory, onRemove }) => {
  return (
    <NeumorphicBox className="mt-6">
      <h2 className="text-2xl font-bold mb-4">검색 기록</h2>
      {searchHistory.length > 0 ? (
        <ul>
          {searchHistory.map((item, index) => (
            <li key={index} className="mb-2 p-2 bg-gray-100 rounded flex justify-between items-center">
              <span>
                <span className="font-semibold">{item.modelName}</span> - {item.boxType}
              </span>
              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                취소
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>검색 기록이 없습니다.</p>
      )}
    </NeumorphicBox>
  );
};

export default SearchHistory;
