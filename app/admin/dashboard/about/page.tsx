// app/admin/dashboard/about/page.tsx
"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/ui/ImageUpload";

export default function AdminAboutPage() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: "",
    paragraphs: [""],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/about")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFormData({
            title: data.data.title || "",
            subtitle: data.data.subtitle || "",
            image: data.data.image || "",
            paragraphs:
              data.data.paragraphs?.length > 0 ? data.data.paragraphs : [""],
          });
        }
        setLoading(false);
      });
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleParagraphChange(index: number, value: string) {
    const updated = [...formData.paragraphs];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, paragraphs: updated }));
  }

  function addParagraph() {
    setFormData((prev) => ({
      ...prev,
      paragraphs: [...prev.paragraphs, ""],
    }));
  }

  function removeParagraph(index: number) {
    if (formData.paragraphs.length > 1) {
      setFormData((prev) => ({
        ...prev,
        paragraphs: prev.paragraphs.filter((_, i) => i !== index),
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const filteredData = {
      ...formData,
      paragraphs: formData.paragraphs.filter((p) => p.trim()),
    };

    const res = await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filteredData),
    });

    const data = await res.json();
    setSaving(false);
    setMessage(
      data.success ? "সফলভাবে সেভ হয়েছে!" : "সেভ করতে সমস্যা হয়েছে।",
    );
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">About Section</h1>

      {message && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Subtitle</label>
          <input
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <ImageUpload
          label="Featured Image"
          value={formData.image}
          onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
        />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium">Paragraphs</label>
            <button
              type="button"
              onClick={addParagraph}
              className="rounded-md bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
            >
              + Add Paragraph
            </button>
          </div>

          <div className="space-y-3">
            {formData.paragraphs.map((paragraph, index) => (
              <div key={index} className="rounded-lg border bg-gray-50 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Paragraph {index + 1}
                  </span>
                  {formData.paragraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParagraph(index)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <textarea
                  value={paragraph}
                  onChange={(e) => handleParagraphChange(index, e.target.value)}
                  rows={3}
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
