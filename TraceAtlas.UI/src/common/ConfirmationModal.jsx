import React, { memo, useCallback } from 'react';
import { createPortal } from 'react-dom';

const WarningIcon = memo(({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      fillRule="evenodd"
      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
      clipRule="evenodd"
    />
  </svg>
));

const QuestionIcon = memo(({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.33-1.824c0 .636-.392 1.238-1.042 1.635-.495.304-.92.56-.92 1.066v.192a.75.75 0 11-1.5 0v-.192c0-1.25.754-2.281 1.905-2.887.833-.44 1.303-1.056 1.303-1.636 0-1.07-1.114-1.94-2.532-1.94-1.268 0-2.391.754-2.532 1.83a.75.75 0 01-1.49-.176C6.91 6.075 8.767 4.5 11.25 4.5c2.348 0 4.032 1.583 4.032 3.44 0 .93-.464 1.776-1.176 2.236zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
      clipRule="evenodd"
    />
  </svg>
));

const ConfirmationModal = memo(({
  isOpen,
  onClose,
  onConfirm,
  title = 'Emin misiniz?',
  message,
  type = 'primary',
  confirmText = 'Evet',
  cancelText = 'Vazgeç',
  isLoading = false
}) => {
  if (!isOpen) return null;

  const isDanger = type === 'danger';

  const handleBackdrop = useCallback(onClose, [onClose]);
  const handleConfirm = useCallback(onConfirm, [onConfirm]);

  return createPortal(
    <div
      onClick={handleBackdrop}
      className="
        fixed inset-0 z-[9999] flex items-center justify-center p-4
        bg-black/40 md:backdrop-blur-sm
      "
    >
      <div
        onClick={e => e.stopPropagation()}
        className="
          w-full max-w-md bg-white rounded-2xl p-6 md:p-8
          shadow-xl transition-transform
        "
      >
        <div className="text-center">
          <div
            className={`mx-auto mb-5 w-14 h-14 flex items-center justify-center rounded-full
              ${isDanger ? 'bg-red-50 text-red-600' : 'bg-teal-50 text-teal-800'}
            `}
          >
            {isDanger
              ? <WarningIcon className="w-7 h-7" />
              : <QuestionIcon className="w-7 h-7" />}
          </div>

          <h3 className="text-lg font-bold text-gray-900">
            {title}
          </h3>

          {message && (
            <p className="mt-2 text-sm text-gray-500">
              {message}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              disabled={isLoading}
              onClick={handleBackdrop}
              className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700"
            >
              {cancelText}
            </button>

            <button
              disabled={isLoading}
              onClick={handleConfirm}
              className={`flex-1 py-2.5 rounded-xl text-white flex items-center justify-center gap-2
                ${isDanger ? 'bg-red-600' : 'bg-teal-800'}
                ${isLoading ? 'opacity-70' : ''}
              `}
            >
              {isLoading && (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              {isLoading ? 'İşleniyor' : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});

export default ConfirmationModal;
