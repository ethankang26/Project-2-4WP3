// Admin dashboard page
import Link from "next/link";

type Book = {
  id: string;
  title: string;
  author: string;
  year_published: number;
  page_count: number;
};

async function getBooks(): Promise<Book[]> {
  const res = await fetch("http://localhost:4000/books");
  return res.json();
}

export default async function AdminPage() {
  const books = await getBooks();

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
                {/* Delete functionality will go here in next step */}
                <span className="text-red-600 font-bold cursor-not-allowed">D</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
