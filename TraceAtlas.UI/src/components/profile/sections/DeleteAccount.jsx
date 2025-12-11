import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../common/ConfirmationModal';
import profileService from '../../../services/profileService';
import { Snackbar, Alert } from '@mui/material';

const TrashIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.49 1.478l-.565 9.064a2.625 2.625 0 01-2.622 2.502h-2.738a2.625 2.625 0 01-2.622-2.502l-.565-9.064a48.816 48.816 0 013.878-.512v-.227c0-1.156 1.054-2.122 2.21-2.204a29.022 29.022 0 012.36 0c1.156.082 2.21 1.048 2.21 2.204zM6.75 12.75a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0v-3.75zM12 12.75a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0v-3.75zM17.25 12.75a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0v-3.75z" clipRule="evenodd" />
  </svg>
);

const WarningIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
  </svg>
);

const DeleteAccount = () => {
  const [confirmText, setConfirmText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
 
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' 
  });
  
  const navigate = useNavigate();

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const handleInitialClick = () => {
    if (confirmText === 'SİL') {
      setIsModalOpen(true);
    }
  };

  const handleFinalDelete = async () => {
    setIsDeleting(true);
    
    try {
      await profileService.deleteAccount();

      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      
      setNotification({
        open: true,
        message: 'Hesabınız başarıyla silindi. Giriş sayfasına yönlendiriliyorsunuz...',
        severity: 'success'
      });
      
     
      setIsModalOpen(false);

      setTimeout(() => {
        navigate('/auth');
      }, 2000);
      
    } catch (error) {
      console.error("Hesap silme hatası:", error);
    
      setNotification({
        open: true,
        message: 'Hesap silinirken bir hata oluştu. Lütfen tekrar deneyiniz.',
        severity: 'error'
      });
      setIsModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-red-50 rounded-xl">
              <WarningIcon className="w-6 h-6 text-red-600" />
          </div>
          <div>
              <h2 className="text-2xl font-bold text-gray-900">Hesap İşlemleri</h2>
              <p className="text-sm text-gray-500">Hesabınızı kalıcı olarak silebilirsiniz.</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border-t border-gray-100 my-8"></div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                <TrashIcon className="w-6 h-6" />
                Hesabı Kalıcı Olarak Sil
              </h3>
              
              <div className="bg-red-50 border border-red-100 rounded-xl p-5 mb-8">
                  <p className="text-red-900 font-medium mb-3">Bu işlem geri alınamaz. Devam ettiğinizde:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-red-800">
                              <span className="text-red-500">✕</span> Profil bilgileriniz ve giriş verileriniz silinir.
                          </li>
                          <li className="flex items-center gap-2 text-sm text-red-800">
                              <span className="text-red-500">✕</span> Favori listeleriniz ve kişisel tercihleriniz silinir.
                          </li>
                      </ul>
                      <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-gray-700">
                              <span className="text-green-600">✓</span> <strong>Paylaşımlarınız silinmez.</strong>
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                              (Eklediğiniz mekanlar ve fotoğraflar "Silinmiş Hesap" olarak platformda kalmaya devam eder.)
                          </li>
                      </ul>
                  </div>
              </div>

              <div className="max-w-md space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                      Onaylamak için aşağıdaki kutucuğa <span className="font-bold select-none">SİL</span> yazın:
                  </label>
                  
                  <div className="relative">
                      <input 
                          type="text" 
                          value={confirmText}
                          onChange={(e) => setConfirmText(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-gray-300 tracking-widest font-bold text-red-600 uppercase" 
                      />
                  </div>

                  <button 
                      onClick={handleInitialClick}
                      disabled={confirmText !== 'SİL'}
                      className="w-full bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex justify-center items-center gap-2"
                  >
                      Hesabımı ve Verilerimi Sil
                  </button>
              </div>
          </div>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleFinalDelete}
        title="Hesabı Sil"
        message="Hesabınızı kalıcı olarak silmek üzeresiniz. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?"
        type="danger"
        confirmText="Evet, Hesabı Sil"
        cancelText="Vazgeç"
        isLoading={isDeleting}
      />

     
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteAccount;