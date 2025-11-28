import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';
import AddMarkerModal from '../../map/components/modal/AddMarkerModal';
import ConfirmationModal from '../../common/ConfirmationModal';

const SharedPlaces = () => {
  const [editingPlace, setEditingPlace] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [sharedPosts, setSharedPosts] = useState([
    { 
      id: 101, 
      title: 'Bursa Gezisi', 
      date: '20 Ekim 2025', 
      latitude: 40.1885, 
      longitude: 29.0610,
      imageBase64: 'https://placehold.co/600x400/1E3A3A/ffffff?text=Bursa',
      creatorUsername: 'eyupkaya',
      createdAt: '2025-10-20T14:00:00',
      description: 'Yeşil Bursa\'nın tarihi dokusu ve İskender kebabı harikaydı. Ulu Cami ve Kozahan mutlaka görülmeli.',
      tags: ['Tarih', 'Yemek', 'Gezi']
    },
    { 
      id: 102, 
      title: 'Sapanca Gölü', 
      date: '15 Eylül 2025',  
      latitude: 40.6926, 
      longitude: 30.2737,
      imageBase64: 'https://placehold.co/600x400/2D554F/ffffff?text=Sapanca',
      creatorUsername: 'eyupkaya',
      createdAt: '2025-09-15T09:30:00',
      description: 'Hafta sonu kaçamağı için mükemmel bir yer. Göl kenarında kahvaltı ve yürüyüş çok huzurlu.',
      tags: ['Doğa', 'Göl', 'Huzur']
    },
  ]);

  const handleSaveEdit = () => {
    setEditingPlace(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setSharedPosts(prev => prev.filter(post => post.id !== deleteId));
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

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
                    onClick={() => setEditingPlace(post)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#1E3A3A] bg-[#1E3A3A]/5 hover:bg-[#1E3A3A] hover:text-white transition-all duration-300"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    <span>Düzenle</span>
                  </button>
                  
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