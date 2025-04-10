'use client';

import React, { useState } from "react";
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
  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const errs: string[] = [];

    if (formData.title.length < 2 || formData.title.length > 100) {
      errs.push("Title must be between 2 and 100 characters.");
    }

    const currentYear = new Date().getFullYear();
    if (
      Number(formData.year_published) < 1450 ||
      Number(formData.year_published) > currentYear
    ) {
      errs.push(`Year published must be between 1450 and ${currentYear}.`);
    }

    if (Number(formData.page_count) <= 10) {
      errs.push("Page count must be a number greater than 10.");
    }

    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {errors.length > 0 && (
        <ul className="bg-red-100 text-red-800 p-2 rounded">
          {errors.map((err, idx) => (
            <li key={idx}>• {err}</li>
          ))}
        </ul>
      )}

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
