'use client';

import Link from "next/link";
import { useTransition } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  year_published: number;
  page_count: number;
};

async function deleteBook(id: string) {
  await fetch(`http://localhost:4000/books/${id}`, {
    method: "DELETE",
  });

  // Revalidate routes after deletion
  await fetch(`http://localhost:3000/api/revalidate?path=/collection`);
  await fetch(`http://localhost:3000/api/revalidate?path=/collection/${id}`);
  await fetch(`http://localhost:3000/api/revalidate?path=/admin`);
}

async function getBooks(): Promise<Book[]> {
  const res = await fetch("http://localhost:4000/books", { cache: "no-store" });
  return res.json();
}

export default function AdminPageWrapper() {
  return <AdminPage />;
}

function AdminPage() {
  const [isPending, startTransition] = useTransition();
  const [books, setBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/create" className="text-blue-600 underline">
          Create New
        </Link>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Pages</th>
            <th className="border p-2">E</th>
            <th className="border p-2">D</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border p-2">{book.id}</td>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.year_published}</td>
              <td className="border p-2">{book.page_count}</td>
              <td className="border p-2 text-center">
                <Link href={`/admin/edit/${book.id}`} className="text-green-600 font-bold">E</Link>
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-600 font-bold"
                  disabled={isPending}
                >
                  D
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
