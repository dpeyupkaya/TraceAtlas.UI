import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiX, FiUser, FiShare2, FiMap, FiHeart, FiNavigation, FiCalendar, FiLoader } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { addFavorite, getLocationById, createShareLink } from '../../services/locationService';
import { clearSelection } from '../../../../store/slices/mapSlice';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const MarkerDetailModal = ({ isOpen, location, onClose }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { selectedLocation, isSidebarOpen } = useSelector((state) => state.map);

  const activeLocation = location || selectedLocation;
  const showModal = isOpen || isSidebarOpen;

  const [fullDetails, setFullDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addingFavorite, setAddingFavorite] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [authAlertOpen, setAuthAlertOpen] = useState(false);

  useEffect(() => {
    if (!activeLocation?.id || !showModal) {
        setFullDetails(null);
        return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await getLocationById(activeLocation.id);
        setFullDetails(data);
        setIsFavorite(data.isFavorite || false);
      } catch (error) {
        console.error("Detay yüklenemedi", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [activeLocation?.id, showModal]);

  const handleClose = () => {
    if (onClose) onClose();
    else dispatch(clearSelection());
    setFullDetails(null);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setAuthAlertOpen(false);
  };

  if (!activeLocation) return null;

  const displayData = {
      ...activeLocation,
      ...fullDetails 
  };

  const finalImageSrc = fullDetails?.blobUrl?.[0] || null;

  const handleShare = async () => {
    try {
      const res = await createShareLink(displayData.id);
      if (navigator.share) {
        await navigator.share({ title: displayData.title, url: res.url });
      } else {
        await navigator.clipboard.writeText(res.url);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${displayData.latitude},${displayData.longitude}`, '_blank');
  };

  const handleFavoriteClick = async () => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
        setAuthAlertOpen(true);
        return;
    }

    if (addingFavorite) return;
    
    setAddingFavorite(true);
    try {
      await addFavorite(displayData.id);
      setIsFavorite(true);
    } catch (e) { 
        console.error(e); 
    } 
    finally { 
        setAddingFavorite(false); 
    }
  };

  return (
    <>
        <div className={`fixed inset-0 z-[2000] flex pointer-events-none ${showModal ? 'visible' : 'invisible'}`}>
        
        <div 
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${showModal ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
        />

        <div 
            className={`
            pointer-events-auto bg-white shadow-2xl flex flex-col
            absolute 
            bottom-0 w-full h-[85vh] rounded-t-3xl
            md:top-0 md:left-0 md:h-full md:w-[450px] md:rounded-none md:rounded-r-2xl
            transition-transform duration-300 ease-out
            ${showModal ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:-translate-x-full'}
            `}
        >
            {/* RESİM ALANI (HEADER) */}
            <div className="relative h-64 md:h-72 w-full shrink-0 bg-gray-100">
            <button 
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white backdrop-blur rounded-full shadow-sm text-gray-700 transition-all active:scale-95"
            >
                <FiX size={20} />
            </button>
            
            {loading && !finalImageSrc ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2 animate-pulse">
                <FiLoader className="animate-spin" size={24}/>
                <span className="text-xs">{t('map.detail.imageLoading')}</span>
                </div>
            ) : finalImageSrc ? (
                <img 
                src={finalImageSrc} 
                alt={displayData.title} 
                className="w-full h-full object-cover"
                loading="lazy"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-teal-50 to-emerald-100 flex flex-col items-center justify-center text-teal-700/50 gap-2">
                <FiMap size={48} />
                <span className="text-sm font-medium">{t('map.detail.noImage')}</span>
                </div>
            )}
            
            {/* Alt taraftaki beyaz gradient div kaldırıldı */}
            </div>

            {/* İÇERİK ALANI */}
            <div className="flex-1 overflow-y-auto px-6 pt-6 relative z-10 custom-scrollbar">
            
            <div className="pb-10 space-y-6">
                <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                    {displayData.title}
                </h1>
                
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                    <FiUser className="text-teal-600" size={14} />
                    <span className="font-medium text-gray-700 truncate max-w-[120px]">
                        {displayData.creatorUsername || t('common.messages.deletedAccount')}
                    </span>
                    </div>
                    {fullDetails?.createdAt && (
                        <div className="flex items-center gap-1.5">
                        <FiCalendar className="text-gray-400" size={14} />
                        <span>{new Date(fullDetails.createdAt).toLocaleDateString(i18n.resolvedLanguage || i18n.language)}</span>
                        </div>
                    )}
                </div>
                </div>

                <div className="flex gap-3">
                <button 
                    onClick={handleDirections} 
                    className="flex-1 bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
                >
                    <FiNavigation className="stroke-[2.5]" /> {t('map.detail.directions')}
                </button>
                
                <button 
                    onClick={handleFavoriteClick}
                    disabled={addingFavorite}
                    className={`w-12 flex items-center justify-center rounded-xl border-2 transition-all active:scale-95 ${isFavorite ? 'border-red-100 bg-red-50 text-red-500' : 'border-gray-100 bg-white text-gray-400 hover:border-gray-300'}`}
                >
                    <FiHeart fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "animate-bounce" : ""} size={22} />
                </button>
                
                <button 
                    onClick={handleShare}
                    className="w-12 flex items-center justify-center rounded-xl border-2 border-gray-100 bg-white text-gray-600 hover:border-gray-300 transition-all active:scale-95"
                >
                    <FiShare2 size={22} />
                </button>
                </div>

                <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('map.detail.description')}</h3>
                {loading && !fullDetails ? (
                    <div className="space-y-2 animate-pulse">
                        <div className="h-4 bg-gray-100 rounded w-full"></div>
                        <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                    </div>
                ) : (
                    <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">
                        {displayData.description || t('common.messages.noDescription')}
                    </p>
                )}
                </div>

                {fullDetails?.tags?.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-gray-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('map.detail.tags')}</h3>
                    <div className="flex flex-wrap gap-2">
                    {fullDetails.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-teal-50 text-teal-700 border border-teal-100 text-xs rounded-full font-semibold">
                        #{tag}
                        </span>
                    ))}
                    </div>
                </div>
                )}
            </div>
            </div>
        </div>
        </div>

        <Snackbar 
            open={authAlertOpen} 
            autoHideDuration={4000} 
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            style={{ zIndex: 2500 }}
        >
            <Alert 
                onClose={handleCloseAlert} 
                severity="warning" 
                variant="filled"
                sx={{ width: '100%', boxShadow: 3, fontWeight: 'medium' }}
            >
                {t('map.detail.favoriteLoginRequired')}
            </Alert>
        </Snackbar>
    </>
  );
};

export default MarkerDetailModal;
