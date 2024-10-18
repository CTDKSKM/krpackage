'use client';

const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="space-y-4 text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-white text-lg font-bold">로딩 중...</p>
    </div>
  </div>
);

export default LoadingOverlay;
