// Admin edit server page
import EditForm from "./EditForm";

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

export default async function EditBookPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  if (!book) {
    return <p className="p-4 text-red-600">❌ Book with ID "{params.id}" not found.</p>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Edit Book</h2>
      <EditForm book={book} />
    </div>
  );
}
