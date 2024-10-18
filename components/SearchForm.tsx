'use client';

import NeumorphicBox from './NeumorphicBox';

interface SearchFormProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

function SearchForm({ searchTerm, setSearchTerm, handleSearch }: SearchFormProps) {
  return (
    <NeumorphicBox className='mb-6'>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}>
        <input
          className="w-full p-4 mb-4 bg-secondary rounded-lg neumorphic-inset focus:ring-2 focus:ring-primary transition-all duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="모델명 입력"
        />
        <button
          type="submit"
          className="w-full p-4 bg-primary text-white rounded-lg neumorphic-button hover:bg-accent transition-all duration-300"
        >
          검색
        </button>
      </form>
    </NeumorphicBox>
  );
}

export default SearchForm;
