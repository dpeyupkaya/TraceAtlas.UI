import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

// Alt Componentler
import ProfileSidebar from './ProfileSidebar';
import FavoritePlaces from './sections/FavoritePlaces';
import SharedPlaces from './sections/SharedPlaces';
import UserPreferences from './sections/UserPreferences';
import SecuritySettings from './sections/SecuritySettings';
import DeleteAccount from './sections/DeleteAccount';

const BaseProfil = () => {
  const [activeTab, setActiveTab] = useState('favorites');

  const renderContent = () => {
    switch (activeTab) {
      case 'favorites':
        return <FavoritePlaces />;
      case 'shared':
        return <SharedPlaces />;
      case 'preferences':
        return <UserPreferences />;
      case 'security':
        return <SecuritySettings />;
      case 'delete':
        return <DeleteAccount />;
      default:
        return <FavoritePlaces />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1E3A3A] via-[#2D554F] to-[#3E6B65] select-none">
      
      <div className="z-50">
        <Navbar />
      </div>

      <main className="flex-grow container mx-auto px-4 py-8 pt-28">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* SOL TARAF: Sidebar */}
          {/* Arka planı belirgin beyaz yaptık ki üzerindeki koyu yazılar okunsun */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-28">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </aside>

          {/* SAĞ TARAF: İçerik Alanı */}
          {/* İçerikleri de beyaz panel içine aldık */}
          <section className="w-full lg:w-3/4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 min-h-[600px]">
              {renderContent()}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BaseProfil;