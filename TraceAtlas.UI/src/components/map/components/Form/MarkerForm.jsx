import React, { useState, useRef } from "react";
import { FiImage, FiX } from "react-icons/fi";
import { useTranslation } from 'react-i18next';

const MarkerForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
    tagInput: "",
    imageFile: null,       // gerçek dosya
    imagePreview: null     // ekranda göstermek için
  });

  const fileRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      imageFile: null,
      imagePreview: null
    }));

    if (fileRef.current) fileRef.current.value = "";
  };

  const handleTagKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && formData.tagInput.trim()) {
      e.preventDefault();
      const newTag = formData.tagInput.trim();

      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag],
          tagInput: ""
        }));
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form id="marker-form" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">{t('map.markerForm.title')}</label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
          placeholder={t('map.markerForm.titlePlaceholder')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">{t('map.markerForm.description')}</label>
        <textarea
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
          placeholder={t('map.markerForm.descriptionPlaceholder')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">{t('map.markerForm.tags')}</label>

        <div className="bg-white/5 border border-white/10 rounded-lg p-2 focus-within:border-emerald-500 transition-colors">
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded"
              >
                #{tag}
                <button type="button" onClick={() => removeTag(tag)} className="hover:text-white">
                  <FiX />
                </button>
              </span>
            ))}
          </div>

          <input
            type="text"
            name="tagInput"
            value={formData.tagInput}
            onChange={handleChange}
            onKeyDown={handleTagKeyDown}
            className="w-full bg-transparent text-white focus:outline-none text-sm"
            placeholder={t('map.markerForm.tagsPlaceholder')}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">{t('map.markerForm.photo')}</label>

        {!formData.imagePreview ? (
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:text-white hover:border-white/30 cursor-pointer transition-all"
          >
            <FiImage size={24} className="mb-2" />
            <span className="text-sm">{t('map.markerForm.selectPhoto')}</span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden border border-white/10 group">
            <img
              src={formData.imagePreview}
              alt={t('map.markerForm.previewAlt')}
              className="w-full h-40 object-cover"
            />

            <button
              type="button"
              onClick={removeFile}
              className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiX />
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default MarkerForm;
