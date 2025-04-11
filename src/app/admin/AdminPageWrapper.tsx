'use client';

import React, { useTransition } from 'react';
import Link from 'next/link';

type Book = {
  id: string;
  title: string;
  author: string;
  year_published: number;
  page_count: number;
};

export default function AdminPageWrapper({ books }: { books: Book[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📚 Admin Dashboard</h1>
      <Link href="/admin/create" className="text-blue-600 underline mb-4 block">
        ➕ Add New Book
      </Link>
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book.id} className="border p-4 rounded shadow">
            <p><strong>ID:</strong> {book.id}</p>
            <p><strong>Title:</strong> {book.title}</p>
            <Link
              href={`/admin/edit/${book.id}`}
              className="text-blue-600 underline mr-4"
            >
              ✏️ Edit
            </Link>
            <button
              className="text-red-600 underline"
              onClick={() => {
                startTransition(async () => {
                  await fetch(`http://localhost:4000/books/${book.id}`, { method: 'DELETE' });
                  await fetch("http://localhost:3000/api/revalidate?path=/collection");
                  await fetch("http://localhost:3000/api/revalidate?path=/admin");
                });
              }}
            >
              🗑 Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
