import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, VStack, Select } from '@chakra-ui/react';
import { products } from '../data/products';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelName: string;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, modelName }) => {
  const [boxType, setBoxType] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (password === '1234') { // 실제 환경에서는 더 안전한 인증 방식을 사용해야 합니다
      products.push({ modelName, boxType });
      onClose();
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>새 제품 추가</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Input value={modelName} isReadOnly placeholder="모델명" />
            <Select value={boxType} onChange={(e) => setBoxType(e.target.value)} placeholder="박스 타입 선택">
              <option value="본체(일반)">본체(일반)</option>
              <option value="본체(미니)">본체(미니)</option>
              <option value="본체(슬림)">본체(슬림)</option>
              <option value="본체(조립pc)">본체(조립pc)</option>
              <option value="노트북">노트북</option>
              <option value="모니터(27)">모니터(27)</option>
              <option value="모니터(24)">모니터(24)</option>
              <option value="모니터(22)">모니터(22)</option>
              <option value="모니터(19)">모니터(19)</option>
            </Select>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            추가
          </Button>
          <Button variant="ghost" onClick={onClose}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
