import AdminPageWrapper from './AdminPageWrapper';

type Book = {
  id: string;
  title: string;
  author: string;
  year_published: number;
  page_count: number;
};

async function getBooks(): Promise<Book[]> {
  const res = await fetch("http://localhost:4000/books", { cache: "no-store" });
  return res.json();
}

export default async function AdminPage() {
  const books = await getBooks();

  return <AdminPageWrapper books={books} />;
}
