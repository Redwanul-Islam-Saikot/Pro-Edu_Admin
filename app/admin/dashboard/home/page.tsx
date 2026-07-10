// app/admin/dashboard/home/page.tsx
"use client";

import ImageUpload from "@/components/ui/ImageUpload";
import { useState, useEffect } from "react";

export default function AdminHomePage() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    heroImage: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/home")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFormData({
            title: data.data.title || "",
            subtitle: data.data.subtitle || "",
            heroImage: data.data.heroImage || "",
            description: data.data.description || "",
          });
        }
        setLoading(false);
      });
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/admin/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
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
      <h1 className="text-2xl font-bold mb-6">Home Section</h1>

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
          label="Hero Image"
          value={formData.heroImage}
          onChange={(url) =>
            setFormData((prev) => ({ ...prev, heroImage: url }))
          }
        />
        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border px-4 py-3"
          />
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
