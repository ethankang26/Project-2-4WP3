// Collection detail page
import Link from "next/link";

type Book = {
  id: string;
  title: string;
  author: string;
  year_published: number;
  page_count: number;
};

async function getBook(id: string): Promise<Book | null> {
  const res = await fetch(`http://localhost:4000/books/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  if (!book) {
    return (
      <div className="p-4">
        <p className="text-red-600">❌ No book found with ID "{params.id}".</p>
        <Link href="/collection" className="text-blue-600 underline">← Back</Link>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Link href="/collection" className="text-blue-600 underline">← Back</Link>
      <h2 className="text-xl font-bold">Book Details</h2>
      <table className="table-auto border-collapse border border-gray-400">
        <tbody>
          <tr><td className="border p-2 font-semibold">ID</td><td className="border p-2">{book.id}</td></tr>
          <tr><td className="border p-2 font-semibold">Title</td><td className="border p-2">{book.title}</td></tr>
          <tr><td className="border p-2 font-semibold">Author</td><td className="border p-2">{book.author}</td></tr>
          <tr><td className="border p-2 font-semibold">Year Published</td><td className="border p-2">{book.year_published}</td></tr>
          <tr><td className="border p-2 font-semibold">Page Count</td><td className="border p-2">{book.page_count}</td></tr>
        </tbody>
      </table>
    </div>
  );
}

// Pre-render first 10 book pages
export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/books");
  const books: Book[] = await res.json();

  return books.slice(0, 10).map((book) => ({
    id: book.id,
  }));
}
