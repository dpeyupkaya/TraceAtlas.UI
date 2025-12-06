import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import profileService from '../../services/profileService';
import ProfileSidebar from './ProfileSidebar';
import FavoritePlaces from './sections/FavoritePlaces';
import SharedPlaces from './sections/SharedPlaces';
import UserPreferences from './sections/UserPreferences';
import SecuritySettings from './sections/SecuritySettings';
import DeleteAccount from './sections/DeleteAccount';
import { Me } from './sections/Me';

// 1. Hook'u import et
import { useGlobalLoader } from '../../hooks/useGlobalLoader';

const BaseProfil = () => {
  const [activeTab, setActiveTab] = useState('me');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Hook'u başlat
  const { withLoader } = useGlobalLoader();

  useEffect(() => {
    const fetchProfile = async () => {
      // 3. API isteğini withLoader ile sarmala
      await withLoader(async () => {
        try {
          const data = await profileService.getProfile();
          setUser(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      });
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'me':
        return <Me user={user} />;
      case 'favorites':
        return <FavoritePlaces />;
      case 'shared':
        return <SharedPlaces />;
      case 'preferences':
        return <UserPreferences user={user} />;
      case 'security':
        return <SecuritySettings userEmail={user?.email} />;
      case 'delete':
        return <DeleteAccount />;
      default:
        return <Me user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#1E3A3A]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1E3A3A] via-[#2D554F] to-[#3E6B65] select-none">
      
      <div className="z-50">
        <Navbar />
      </div>

      <main className="flex-grow container mx-auto px-4 py-8 pt-28">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-28">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <ProfileSidebar 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  user={user} 
              />
            </div>
          </aside>

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