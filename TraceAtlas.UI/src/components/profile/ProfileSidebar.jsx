import React from 'react';
import { useTranslation } from 'react-i18next';

const HeartIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>);
const MapPinIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>);
const SettingsIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.43.816 1.035.816 1.73 0 .695-.32 1.3-.816 1.73m0-3.46a24.347 24.347 0 010 3.46" /></svg>);
const LockIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>);
const TrashIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>);
const UserCircleIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);

const ProfileSidebar = ({ activeTab, setActiveTab, user }) => {
  const { t } = useTranslation();
  
  const menuItems = [
    { id: 'me', label: t('profile.sidebar.me'), icon: UserCircleIcon },
    { id: 'favorites', label: t('profile.sidebar.favorites'), icon: HeartIcon },
    { id: 'shared', label: t('profile.sidebar.shared'), icon: MapPinIcon },
    { id: 'preferences', label: t('profile.sidebar.preferences'), icon: SettingsIcon },
    { id: 'security', label: t('profile.sidebar.security'), icon: LockIcon },
    { id: 'delete', label: t('profile.sidebar.account'), icon: TrashIcon},
  ];

  

  return (
    <div className="flex flex-col h-full lg:p-6 p-4 bg-transparent">
      
      <div className="flex items-center space-x-4 mb-4 lg:mb-8 pb-4 lg:pb-6 border-b border-gray-100/50">
       
        <div className="min-w-0">
          <h3 className="font-bold text-[#1E3A3A] text-base lg:text-lg truncate">
             {user ? `${user.firstName} ${user.lastName} ` : t('common.states.loading')}
          </h3>
        
        </div>
      </div>

      <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                flex items-center gap-2 lg:gap-3 px-4 py-2.5 lg:px-5 lg:py-4 
                text-sm font-semibold rounded-xl lg:rounded-2xl 
                transition-all duration-300 relative group flex-shrink-0 whitespace-nowrap
                ${isActive 
                  ? 'bg-[#1E3A3A]/5 text-[#1E3A3A]' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-[#1E3A3A]'
                }
                ${item.danger 
                  ? 'text-red-500 hover:bg-red-50 hover:text-red-600' 
                  : ''
                }
                ${item.danger && isActive ? '!bg-red-50 !text-red-600' : ''}
              `}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 
                ${isActive && !item.danger ? 'text-[#10B981] lg:scale-110' : ''}
                ${!isActive && !item.danger ? 'text-gray-400 group-hover:text-[#1E3A3A]' : ''}
                ${item.danger ? 'text-red-400 group-hover:text-red-600' : ''}
              `} />
              
              <span className="relative z-10">{item.label}</span>
              
              {isActive && !item.danger && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#10B981] rounded-r-full"></div>
              )}
            </button>
          );
        })}
      </nav>
      
    </div>
  );
};

export default ProfileSidebar;
