'use client';

import { useState } from 'react';
import { Box, Container, Heading, Input, Button, VStack, Text, useDisclosure } from '@chakra-ui/react';
import { SearchResult } from '../types';
import { products } from '../data/products';
import AddProductModal from '../components/AddProductModal';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notFoundModel, setNotFoundModel] = useState('');

  const handleSearch = () => {
    const foundProduct = products.find(p => p.modelName === searchTerm);
    if (foundProduct) {
      setSearchResults(prev => ({
        ...prev,
        [foundProduct.boxType]: (prev[foundProduct.boxType] || 0) + 1
      }));
    } else {
      setNotFoundModel(searchTerm);
      onOpen();
    }
    setSearchTerm('');
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6}>
        <Heading>제품 검색</Heading>
        <Box>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="모델명 입력"
          />
          <Button onClick={handleSearch} mt={2}>검색</Button>
        </Box>
        <Box>
          {Object.entries(searchResults).map(([boxType, count]) => (
            <Text key={boxType}>{boxType} x {count}개</Text>
          ))}
        </Box>
      </VStack>
      <AddProductModal isOpen={isOpen} onClose={onClose} modelName={notFoundModel} />
    </Container>
  );
}