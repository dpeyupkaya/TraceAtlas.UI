import React from 'react';
import InfoPanel from './components/InfoPanel';
import WelcomePanel from './components/WelcomePanel';
import RegisterPanel from './components/RegisterPanel';
import Footer from '../../components/footer/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#022c22] overflow-x-hidden">
      
      <div className="flex flex-col md:flex-row w-full flex-grow">
        
        <div className="w-full md:w-1/3 h-[100dvh] md:h-auto border-b md:border-b-0 md:border-r border-[#10b981]/10 shrink-0">
          <InfoPanel />
        </div>
        
        <div className="w-full md:w-1/3 h-[100dvh] md:h-auto border-b md:border-b-0 md:border-r border-[#10b981]/10 shrink-0">
          <WelcomePanel />
        </div>
        
        <div className="w-full md:w-1/3 h-[100dvh] md:h-auto shrink-0">
          <RegisterPanel />
        </div>

      </div>

      <Footer />
      
    </div>
  );
};

export default HomePage;