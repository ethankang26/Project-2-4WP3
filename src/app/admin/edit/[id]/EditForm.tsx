// Admin client edit form
import React from "react";
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

type Book = {
  id: string;
  title: string;
  author: string;
  year_published: number;
  page_count: number;
};

export default function EditForm({ book }: { book: Book }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ ...book });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`http://localhost:4000/books/${book.id}`, {
      method: "PUT",
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
    <form onSubmit={handleSubmit} className="space-y-2 max-w-md">
      {["title", "author", "year_published", "page_count"].map((field) => (
        <div key={field} className="flex flex-col">
          <label htmlFor={field} className="capitalize font-medium">
            {field.replace("_", " ")}
          </label>
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
        className="bg-green-600 text-white font-bold px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </form>
  );
}
