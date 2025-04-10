// Admin create form page
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBookPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    year_published: "",
    page_count: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("http://localhost:4000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        year_published: Number(formData.year_published),
        page_count: Number(formData.page_count),
      }),
    });

    router.push("/admin");
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Create New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-2 max-w-md">
        {["id", "title", "author", "year_published", "page_count"].map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="capitalize font-medium">{field.replace("_", " ")}</label>
            <input
              type="text"
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              required
              className="border px-2 py-1 rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
