import React from 'react';

const WarningIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
  </svg>
);

const QuestionIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.33-1.824c0 .636-.392 1.238-1.042 1.635-.495.304-.92.56-.92 1.066v.192a.75.75 0 11-1.5 0v-.192c0-1.25.754-2.281 1.905-2.887.833-.44 1.303-1.056 1.303-1.636 0-1.07-1.114-1.94-2.532-1.94-1.268 0-2.391.754-2.532 1.83a.75.75 0 01-1.49-.176C6.91 6.075 8.767 4.5 11.25 4.5c2.348 0 4.032 1.583 4.032 3.44 0 .93-.464 1.776-1.176 2.236zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
  </svg>
);

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Emin misiniz?', 
  message = 'Bu işlemi gerçekleştirmek istediğinize emin misiniz?', 
  type = 'primary', // 'primary' (Yeşil/Teal) veya 'danger' (Kırmızı)
  confirmText = 'Evet, Devam Et', 
  cancelText = 'Vazgeç',
  isLoading = false 
}) => {
  if (!isOpen) return null;

  const isDanger = type === 'danger';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#1E3A3A]/60 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 md:p-8 transform transition-all duration-300 scale-100 opacity-100 border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 
            ${isDanger 
              ? 'bg-red-50 text-red-600' 
              : 'bg-[#1E3A3A]/5 text-[#1E3A3A]' 
            }`}
          >
            {isDanger ? (
              <WarningIcon className="w-8 h-8" />
            ) : (
              <QuestionIcon className="w-8 h-8" />
            )}
          </div>

          <h3 className="text-xl font-bold text-[#1E3A3A] mb-2">
            {title}
          </h3>
          
          <p className="text-gray-500 mb-8 leading-relaxed">
            {message}
          </p>

          <div className="flex items-center gap-3 w-full">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-colors duration-200"
            >
              {cancelText}
            </button>
            
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 py-3 px-4 font-medium rounded-xl text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2
                ${isDanger 
                  ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' 
                  : 'bg-[#1E3A3A] hover:bg-[#2D554F] shadow-[#1E3A3A]/20'
                }
                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>İşleniyor...</span>
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;