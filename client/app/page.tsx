import NotesByPriority from '@/components/NoteByPriority';

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }:   {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
  return (
    <div className='container mx-auto'>
      <h1 className="text-2xl mt-4">
        Csr-Ssg props main page
      </h1>
      <pre className='mb-4'>this home page route &apos;/&apos;</pre>
    </div>
  );
}
