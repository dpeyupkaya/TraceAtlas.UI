import React from 'react';
import Logout from './Logout'

export const Me = ({ user }) => {
  
  if (!user) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  // Tarih formatlama
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Üst Kısım: Profil Başlığı */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-4">
       
        <div>
          <h2 className="text-xl font-bold text-gray-800">Profil Bilgileri</h2>
          <p className="text-sm text-gray-500">Hesap detayların aşağıdadır.</p>
        </div>
      </div>

      {/* Alt Kısım: Detaylar Listesi */}
      <div className="p-6 grid gap-6 md:grid-cols-2">
        
        {/* Ad */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ad</label>
          <div className="font-medium text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
            {user.firstName}
          </div>
        </div>

        {/* Soyad */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Soyad</label>
          <div className="font-medium text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
            {user.lastName}
          </div>
        </div>

        {/* Kullanıcı Adı (BURASI) */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Kullanıcı Adı</label>
          <div className="font-medium text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
            @{user.userName}
          </div>
        </div>

        {/* E-posta */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">E-posta Adresi</label>
          <div className="font-medium text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {user.email}
          </div>
        </div>

     

        {/* Katılma Tarihi */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Katılma Tarihi</label>
          <div className="font-medium text-[#1E3A3A] bg-[#1E3A3A]/5 p-3 rounded-lg border border-[#1E3A3A]/10 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(user.createdAt)}
          </div>
        </div>
        <div className="md:col-span-2 space-y-1">
  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
    Kalan Hakkınız
  </label>
  <div className="font-medium text-[#1E3A3A] bg-[#1E3A3A]/5 p-3 rounded-lg border border-[#1E3A3A]/10 flex items-center justify-between">
    
    <div className="flex items-center gap-2">
    
      <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
      
  
      <span className="text-xl font-bold tracking-tight">
        {user?.remainingRights ?? 0}
      </span>
      <span className="text-sm opacity-70 font-normal">Adet</span>
    </div>

    <span className="text-xs text-gray-400 font-semibold">MAX: 5</span>

  </div>
</div>
          <div className="md:col-span-2"
          >
               <Logout />
          </div>

      </div>
    </div>
  )
} 
