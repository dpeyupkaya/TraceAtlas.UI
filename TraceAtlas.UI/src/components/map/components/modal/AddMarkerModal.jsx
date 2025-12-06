import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { FiX, FiCheck, FiLoader } from "react-icons/fi";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

import MarkerForm from "../Form/MarkerForm";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { createLocation } from "../../services/locationService";
import { getCurrentUserId } from "../../utils/authUtils";
import { closeAddLocationModal } from "../../../../store/slices/mapSlice";


import { useGlobalLoader } from "../../../../hooks/useGlobalLoader";

const AddMarkerModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  // 2. Hook'u başlat
  const { withLoader } = useGlobalLoader();

  const { addLocationModalOpen, newLocationPosition } = useSelector(s => s.map);

  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cachedFormData, setCachedFormData] = useState(null);
  const [warning, setWarning] = useState("");

  if (!addLocationModalOpen) return null;

  const close = () => {
    setWarning("");
    dispatch(closeAddLocationModal());
  };

  const handleFormSubmit = (formData) => {
    setWarning("");

    if (!formData.title?.trim()) {
      setWarning("Başlık zorunludur.");
      return;
    }

    if (formData.imageFile) {
      const okTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!okTypes.includes(formData.imageFile.type)) {
        setWarning("Sadece JPG, PNG, WebP veya GIF yükleyebilirsiniz.");
        return;
      }

      if (formData.imageFile.size > 5 * 1024 * 1024) {
        setWarning("Resim boyutu 5MB’tan küçük olmalıdır.");
        return;
      }
    }

    setCachedFormData({
      title: formData.title.trim(),
      description: formData.description?.trim() || "",
      tags: formData.tags || [],
      imageFile: formData.imageFile || null,
      region: formData.region || "Bilinmiyor"
    });

    setConfirmOpen(true);
  };

  const handleSave = async () => {
    setLoading(true); // Butonu disable etmek için lokal state'i koruyoruz
    setWarning("");

    // 3. İşlemi withLoader içine alıyoruz
    await withLoader(async () => {
      try {
        const userId = getCurrentUserId();
        if (!userId) throw new Error("Oturum süresi dolmuş.");

        const fd = new FormData();
        fd.append("Title", cachedFormData.title);
        fd.append("Latitude", newLocationPosition.lat.toFixed(8));
        fd.append("Longitude", newLocationPosition.lng.toFixed(8));
        fd.append("UserId", userId);
        fd.append("Region", cachedFormData.region);

        if (cachedFormData.description)
          fd.append("Description", cachedFormData.description);

        cachedFormData.tags.forEach(t => fd.append("Tags", t));

        if (cachedFormData.imageFile)
          fd.append("Image", cachedFormData.imageFile);

        await createLocation(fd);
        
        queryClient.invalidateQueries(["locations"]);
        close();
        
      } catch (e) {
        // Hata olursa modal üzerindeki alert alanına yazdırıyoruz
        setWarning(e.message || "Kayıt sırasında hata oluştu.");
      }
    });

    // İşlem bitince (başarılı veya hatalı) lokal loading'i kapat
    setLoading(false);
    setConfirmOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="w-full max-w-xl bg-zinc-900 text-zinc-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

          <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <h2 className="text-lg font-semibold text-white">Yeni Konum</h2>
            <button 
              onClick={close}
              className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
            >
              <FiX size={20} />
            </button>
          </header>

          <div className="p-6 space-y-4">
            <Collapse in={!!warning}>
              <Alert severity="warning" variant="filled" onClose={() => setWarning("")}>
                {warning}
              </Alert>
            </Collapse>

            <MarkerForm onSubmit={handleFormSubmit} loading={loading} />

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
                onClick={close}
                disabled={loading}
                className="px-5 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Vazgeç
              </button>

              <button
                type="submit"
                form="marker-form"
                disabled={loading}
                className="px-6 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/20"
              >
                {loading ? <FiLoader className="animate-spin" /> : <FiCheck />}
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSave}
        title="Onay"
        message={`"${cachedFormData?.title}" konumu kaydedilecek.`}
        confirmText="Kaydet"
        cancelText="Düzenle"
        isLoading={loading}
      />
    </>
  );
};

export default AddMarkerModal;