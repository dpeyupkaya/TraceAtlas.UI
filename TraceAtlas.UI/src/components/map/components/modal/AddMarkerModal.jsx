import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { FiX, FiCheck, FiLoader, FiInfo } from "react-icons/fi"; // FiInfo ikonunu ekledik
import { useTranslation } from 'react-i18next';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

import MarkerForm from "../Form/MarkerForm";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { createLocation } from "../../services/locationService";
import { getCurrentUserId } from "../../utils/authUtils";
import { closeAddLocationModal } from "../../../../store/slices/mapSlice";

import { useGlobalLoader } from "../../../../hooks/useGlobalLoader";

const AddMarkerModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

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
      setWarning(t('map.addMarker.titleRequired'));
      return;
    }

  
    if (formData.tags && formData.tags.length > 3) {
        setWarning(t('map.addMarker.maxTags'));
        return;
    }
 

    if (formData.imageFile) {
      const okTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!okTypes.includes(formData.imageFile.type)) {
        setWarning(t('map.addMarker.invalidImage'));
        return;
      }

      if (formData.imageFile.size > 5 * 1024 * 1024) {
        setWarning(t('map.addMarker.imageTooLarge'));
        return;
      }
    }

    setCachedFormData({
      title: formData.title.trim(),
      description: formData.description?.trim() || "",
      tags: formData.tags || [],
      imageFile: formData.imageFile || null,
      region: formData.region || t('map.addMarker.unknownRegion')
    });

    setConfirmOpen(true);
  };

  const handleSave = async () => {
    setLoading(true);
    setWarning("");

    await withLoader(async () => {
      try {
        const userId = getCurrentUserId();
        if (!userId) throw new Error(t('map.addMarker.sessionExpired'));

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
        setWarning(e.message || t('map.addMarker.saveError'));
      }
    });

    setLoading(false);
    setConfirmOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="w-full max-w-xl bg-zinc-900 text-zinc-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

          <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <h2 className="text-lg font-semibold text-white">{t('map.addMarker.newLocation')}</h2>
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

         
        
            <MarkerForm 
                onSubmit={handleFormSubmit} 
                loading={loading}
               
                maxTags={3} 
            />

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
                onClick={close}
                disabled={loading}
                className="px-5 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {t('common.buttons.cancel')}
              </button>

              <button
                type="submit"
                form="marker-form"
                disabled={loading}
                className="px-6 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/20"
              >
                {loading ? <FiLoader className="animate-spin" /> : <FiCheck />}
                {t('common.buttons.save')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSave}
        title={t('map.addMarker.confirmTitle')}
        message={t('map.addMarker.confirmMessage', { title: cachedFormData?.title })}
        confirmText={t('common.buttons.save')}
        cancelText={t('common.buttons.edit')}
        isLoading={loading}
      />
    </>
  );
};

export default AddMarkerModal;
