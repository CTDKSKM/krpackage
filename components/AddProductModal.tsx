'use client';

import { useState } from 'react';
import { getProducts, saveProducts } from '@/utils/product';
import Toast from './Toast';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelName: string;
  onProductAdded: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, modelName, onProductAdded }) => {
  const [boxType, setBoxType] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async () => {
    if (password === '1111') { // 실제 환경에서는 더 안전한 인증 방식을 사용해야 합니다
      try {
        const currentProducts = await getProducts();
        const upperCaseModelName = modelName.toUpperCase();
        const isDuplicate = currentProducts.some(p => p.modelName.toUpperCase() === upperCaseModelName);
        if (isDuplicate) {
          setToastMessage('이미 존재하는 모델명입니다.');
          setShowToast(true);
          return;
        }
        const updatedProducts = [...currentProducts, { modelName: upperCaseModelName, boxType }];
        await saveProducts(updatedProducts);
        onProductAdded();
        onClose();
        setToastMessage('제품이 성공적으로 추가되었습니다.');
        setShowToast(true);
      } catch (error) {
        console.error('Failed to add product:', error);
        setToastMessage('제품 추가에 실패했습니다.');
        setShowToast(true);
      }
    } else {
      setToastMessage('비밀번호가 올바르지 않습니다.');
      setShowToast(true);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">새 제품 추가</h2>
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="space-y-4">
              <input
                value={modelName}
                readOnly
                placeholder="모델명"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <select
                value={boxType}
                onChange={(e) => setBoxType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">박스 타입 선택</option>
                <option value="본체(일반)">본체(일반)</option>
                <option value="본체(미니)">본체(미니)</option>
                <option value="본체(슬림)">본체(슬림)</option>
                <option value="본체(조립pc)">본체(조립pc)</option>
                <option value="노트북">노트북</option>
                <option value="모니터(27)">모니터(27)</option>
                <option value="모니터(24)">모니터(24)</option>
                <option value="모니터(22)">모니터(22)</option>
                <option value="모니터(19)">모니터(19)</option>
              </select>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              추가
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              취소
            </button>
          </div>
        </div>
      </div>
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default AddProductModal;
