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
  const [imagePreview, setImagePreview] = useState("");

  const setValue = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: form.title,
      description: form.description,
      tags: form.tags,
      imageBase64: form.imageBase64,
      isShared: form.isShared,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => setValue("imageBase64", reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview("");
    setValue("imageBase64", "");
    if (fileRef.current) fileRef.current.value = "";
  };

  const addTag = () => {
    const t = form.tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setValue("tags", [...form.tags, t]);
    }
    setValue("tagInput", "");
  };

  const handleTagKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form
      id="marker-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      <div className="flex items-center gap-3">
        <input
          className="flex-1 bg-white/5 border border-white/15 text-white text-sm px-4 py-3 rounded-xl focus:bg-white/10 focus:border-emerald-400/50 outline-none transition-all"
          placeholder="Konum Başlığı"
          value={form.title}
          onChange={(e) => setValue("title", e.target.value)}
          required
        />

        <button
          type="button"
          onClick={() => setValue("isShared", !form.isShared)}
          className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all ${
            form.isShared
              ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
              : "border-white/10 text-white/40 bg-white/5 hover:bg-white/10"
          }`}
        >
          {form.isShared ? (
            <svg width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            </svg>
          ) : (
            <svg width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>

      <textarea
        className="bg-white/5 border border-white/15 rounded-xl text-white text-sm px-4 py-3 focus:bg-white/10 focus:border-emerald-400/50 outline-none transition-all resize-none"
        placeholder="Kısa açıklama"
        rows={2}
        value={form.description}
        onChange={(e) => setValue("description", e.target.value)}
        required
      />

      <div className="flex flex-col gap-3">
        <input
          className="bg-white/5 border border-white/15 rounded-xl text-white text-sm px-4 py-3 focus:bg-white/10 focus:border-emerald-400/50 outline-none transition-all"
          placeholder="Etiket ekle (Enter)"
          value={form.tagInput}
          onChange={(e) => setValue("tagInput", e.target.value)}
          onKeyDown={handleTagKey}
        />

        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs text-emerald-300 border border-emerald-400/40 rounded-full bg-emerald-500/10 flex items-center gap-1"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() =>
                    setValue(
                      "tags",
                      form.tags.filter((x) => x !== tag)
                    )
                  }
                  className="hover:text-white"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {!imagePreview ? (
        <label className="border border-dashed border-white/20 rounded-xl py-4 text-white/50 text-sm cursor-pointer bg-white/5 hover:bg-white/10 transition-all text-center">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          Fotoğraf ekle
        </label>
      ) : (
        <div className="relative h-28 rounded-xl overflow-hidden border border-emerald-500/30 group">
          <img
            src={imagePreview}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all"
          >
            Sil
          </button>
        </div>
      )}

      <button type="submit" disabled={loading} className="hidden">
        Kaydet
      </button>
    </form>
  );
};

export default MarkerForm;
