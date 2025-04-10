// Collection list page
import React from "react";
import Link from "next/link";

type Book = {
  id: string;
  title: string;
};

async function getBooks(): Promise<Book[]> {
  const res = await fetch("http://localhost:4000/books");
  return res.json();
}

export default async function CollectionPage() {
  const books = await getBooks();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Book Collection</h1>
      {books.map((book) => (
        <div
          key={book.id}
          className="border p-4 rounded shadow flex justify-between"
        >
          <div>
            <p><strong>ID:</strong> {book.id}</p>
            <p><strong>Title:</strong> {book.title}</p>
          </div>
          <Link href={`/collection/${book.id}`} className="text-blue-600 underline">
            more
          </Link>
        </div>
      ))}
    </div>
  );
}
