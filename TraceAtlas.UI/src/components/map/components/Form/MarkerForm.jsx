import React, { useState, useRef } from "react";

const MarkerForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: [],
    tagInput: "",
    imageBase64: "",
    isShared: false,
  });

  const fileRef = useRef(null);
  const [preview, setPreview] = useState("");

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onloadend = () => update("imageBase64", reader.result);
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setPreview("");
    update("imageBase64", "");
    if (fileRef.current) fileRef.current.value = "";
  };

  const addTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && form.tagInput.trim()) {
      e.preventDefault();
      const t = form.tagInput.trim();
      if (!form.tags.includes(t)) update("tags", [...form.tags, t]);
      update("tagInput", "");
    }
  };

  return (
    <form id="marker-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <input
          className="flex-1 bg-white/5 border border-white/15 text-white text-sm px-4 py-3 rounded-xl focus:bg-white/10 focus:border-emerald-400/50 outline-none transition-all"
          placeholder="Konum Başlığı"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          required
        />
      
      </div>

      <textarea
        className="bg-white/5 border border-white/15 rounded-xl text-white text-sm px-4 py-3 focus:bg-white/10 focus:border-emerald-400/50 outline-none transition-all resize-none"
        placeholder="Kısa açıklama"
        rows={2}
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
        required
      />

      <div className="flex flex-col gap-3">
        <input
          className="bg-white/5 border border-white/15 rounded-xl text-white text-sm px-4 py-3 focus:bg-white/10 focus:border-emerald-400/50 outline-none transition-all"
          placeholder="Etiket ekle (Enter)"
          value={form.tagInput}
          onChange={(e) => update("tagInput", e.target.value)}
          onKeyDown={addTag}
        />
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 text-xs text-emerald-300 border border-emerald-400/40 rounded-full bg-emerald-500/10 flex items-center gap-1">
                #{tag}
                <button
                  type="button"
                  onClick={() => update("tags", form.tags.filter((t) => t !== tag))}
                  className="hover:text-white ml-1"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {!preview ? (
        <label className="border border-dashed border-white/20 rounded-xl py-4 text-white/50 text-sm cursor-pointer bg-white/5 hover:bg-white/10 transition-all text-center">
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          Fotoğraf ekle
        </label>
      ) : (
        <div className="relative h-28 rounded-xl overflow-hidden border border-emerald-500/30 group">
          <img src={preview} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" alt="Preview" />
          <button
            type="button"
            onClick={removeFile}
            className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all"
          >
            Sil
          </button>
        </div>
      )}

      <button type="submit" disabled={loading} className="hidden">Kaydet</button>
    </form>
  );
};

export default MarkerForm;