import React, { useState, useEffect } from 'react';
import MarkerDetailModal from '../../map/components/modal/MarkerDetailModal';
import profileService from '../../../services/profileService';
import { removeFavorite } from '../../map/services/locationService.js';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Button, 
  Snackbar, 
  Alert 
} from '@mui/material';

const FavoritePlaces = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);


  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState(null);


  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' 
  });

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await profileService.getFavorites();
        
        const mappedData = data.map(item => ({
          id: item.locationId,
          title: item.title,
        }));

        setFavorites(mappedData);
      } catch (error) {
        console.error("Favoriler yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveClick = (e, id) => {
    e.stopPropagation();
    setPlaceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!placeToDelete) return;

    try {
      await removeFavorite(placeToDelete);
      setFavorites(prev => prev.filter(place => place.id !== placeToDelete));
      
      setSnackbar({
        open: true,
        message: 'Mekan favorilerden kaldırıldı.',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Silme işlemi sırasında bir hata oluştu.',
        severity: 'error'
      });
    } finally {
      setDeleteDialogOpen(false);
      setPlaceToDelete(null);
    }
  };

 
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E3A3A]"></div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#1E3A3A]">Favori Mekanlarım</h2>
        <span className="px-3 py-1 rounded-full bg-[#1E3A3A]/5 text-[#1E3A3A] text-sm font-semibold border border-[#1E3A3A]/10">
          {favorites.length} Mekan
        </span>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((place) => (
            <div 
              key={place.id} 
              onClick={() => setSelectedPlace(place)}
              className="group bg-white rounded-2xl shadow-sm border-gray-10 flex flex-col cursor-pointer p-6 relative overflow-hidden"
            >
              <div className="flex flex-col flex-grow relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-[#1E3A3A] transition-colors line-clamp-1">
                      {place.title}
                    </h3>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlace(place);
                    }}
                    className="flex-1 py-2 bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FiEye /> İncele
                  </button>

                  <button 
                    onClick={(e) => handleRemoveClick(e, place.id)}
                    className="w-10 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
          Favori mekan bulunamadı.
        </div>
      )}

  
      {selectedPlace && (
        <MarkerDetailModal 
          isOpen={true} 
          location={selectedPlace} 
          onClose={() => setSelectedPlace(null)} 
        />
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Favorilerden Çıkar?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bu mekanı favorilerinizden çıkarmak istediğinize emin misiniz? Bu işlem geri alınamaz.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            İptal
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Sil
          </Button>
        </DialogActions>
      </Dialog>

 
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default FavoritePlaces;