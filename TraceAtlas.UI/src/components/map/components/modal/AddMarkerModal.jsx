import React, { useState } from "react";
import { FiX, FiCheck, FiLoader } from "react-icons/fi";
import MarkerForm from "../Form/MarkerForm";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { createLocation } from "../../services/locationService";
import { getCurrentUserId } from "../../utils/authUtils";

const AddMarkerModal = ({ isOpen, onClose, selectedPosition, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cachedFormData, setCachedFormData] = useState(null);

  if (!isOpen) return null;

  const handleFormSubmit = (formData) => {
    setCachedFormData(formData);
    setConfirmOpen(true);
  };

  const handleFinalSave = async () => {
    setLoading(true);
    
    const userId = getCurrentUserId();
    
    if (!userId) {
      alert("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.");
      setLoading(false);
      setConfirmOpen(false);
      return;
    }

    const commandData = {
      Title: cachedFormData.title,
      Description: cachedFormData.description,
      Latitude: selectedPosition?.lat || 0,
      Longitude: selectedPosition?.lng || 0,
      Tags: cachedFormData.tags,
      ImageBase64: cachedFormData.imageBase64 ? cachedFormData.imageBase64.split(',')[1] : null,
      UserId: userId,
      Region: ""
    };

    try {
      await createLocation(commandData);
      if (onSuccess) onSuccess();
      setConfirmOpen(false);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Konum kaydedilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm modal-fade"
          onClick={onClose}
        />

        <div className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden modal-scale">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <h2 className="text-lg font-semibold text-white">Konum Ekle</h2>
            <button 
              onClick={onClose}
              disabled={loading}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="p-6">
            <MarkerForm onSubmit={handleFormSubmit} loading={loading} />

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/5">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                İptal
              </button>

              <button
                type="submit"
                form="marker-form"
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-lg transition-colors shadow-lg shadow-emerald-900/20"
              >
                {loading ? <FiLoader className="animate-spin" /> : <FiCheck />}
                <span>Kaydet</span>
              </button>
            </div>
          </div>
        </div>

        <style>{`
          .modal-fade { animation: fadeIn 0.25s ease-out forwards; }
          .modal-scale { animation: scaleIn 0.25s ease-out forwards; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        `}</style>
      </div>

      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleFinalSave}
        title="Konumu Kaydetmek İstiyor Musun?"
        message="Girdiğin bilgileri doğrulayıp konumu eklemek üzeresin."
        confirmText="Evet, Kaydet"
        cancelText="İptal"
        type="primary"
        isLoading={loading}
      />
    </>
  );
};

export default AddMarkerModal;