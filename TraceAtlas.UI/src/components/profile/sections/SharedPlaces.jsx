import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';
import AddMarkerModal from '../../map/components/modal/AddMarkerModal';
import ConfirmationModal from '../../common/ConfirmationModal';
import profileService from '../../../services/profileService'; // Servis importu

const SharedPlaces = () => {
  const [editingPlace, setEditingPlace] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sharedPosts, setSharedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend'den paylaşımları çek
  useEffect(() => {
    const fetchMyPlaces = async () => {
      try {
        const data = await profileService.getMyPlaces();
        const mappedData = data.map(item => ({
            id: item.id || item.locationId,
            title: item.name || item.title || 'İsimsiz Mekan',
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Tarih Yok',
            latitude: item.latitude || 0,
            longitude: item.longitude || 0,
            imageBase64: item.imageBase64 || 'https://placehold.co/600x400/1E3A3A/ffffff?text=TraceAtlas',
            creatorUsername: item.creatorUsername || 'Ben',
            createdAt: item.createdAt,
            description: item.description || 'Açıklama girilmemiş.',
            tags: item.tags || []
        }));
        setSharedPosts(mappedData);
      } catch (error) {
        console.error("Paylaşımlar çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPlaces();
  }, []);

  // Düzenlemeyi kaydet
  const handleSaveEdit = (updatedData) => {
    setSharedPosts(prev => prev.map(post => 
        post.id === editingPlace.id ? { ...post, ...updatedData } : post
    ));
    setEditingPlace(null);
  };

  // Silme modalını aç
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // Silmeyi onayla
  const confirmDelete = async () => {
    try {
        // Backend'de mekan silme endpointi varsa çağır
        await profileService.deleteMyPlace(deleteId); 
        
        // UI'dan sil
        setSharedPosts(prev => prev.filter(post => post.id !== deleteId));
        setIsDeleteModalOpen(false);
        setDeleteId(null);
    } catch (error) {
        alert("Silme işlemi başarısız.");
    }
  };

  if (loading) {
      return (
          <div className="flex justify-center items-center h-64">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E3A3A]"></div>
          </div>
      );
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#1E3A3A]">Paylaşımlarım</h2>
          <span className="px-3 py-1 rounded-full bg-[#1E3A3A]/5 text-[#1E3A3A] text-sm font-semibold border border-[#1E3A3A]/10">
            {sharedPosts.length} Paylaşım
          </span>
        </div>

        {sharedPosts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {sharedPosts.map((post) => (
              <div 
                key={post.id} 
                className="group relative bg-white p-5 rounded-2xl border border-gray-100 hover:border-[#10B981]/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-[#1E3A3A] group-hover:text-[#10B981] transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-1 mb-3 pr-4">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                    <div className="flex items-center gap-1">
                      <FiCalendar className="w-3.5 h-3.5" />
                      {post.date}
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex items-center gap-2 mt-2 sm:mt-0">
                 
                  <button 
                    onClick={() => handleDeleteClick(post.id)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    <span>Sil</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-center">
              <p className="text-gray-500">Henüz paylaşım yapmadınız.</p>
          </div>
        )}
      </div>

      {editingPlace && (
        <AddMarkerModal 
          position={{ lat: editingPlace.latitude, lng: editingPlace.longitude }}
          initialData={editingPlace}
          onClose={() => setEditingPlace(null)}
          onSave={handleSaveEdit}
        />
      )}

      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Paylaşımı Sil"
        message="Bu paylaşımı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        type="danger"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
      />
    </>
  );
};

export default SharedPlaces;
