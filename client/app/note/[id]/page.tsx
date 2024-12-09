import NotesService from '@/http-for-fetch';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: {
    id: string
  }
}
export interface NotesData {
  data: Note[]
  count: number
  pages: number
  starnewpage: number
  currentpage: number
}

export interface Note {
  id: number
  title: string
  author: string
  body: string
  priority: string
}

async function getArrayId(): Promise<number[]> {
  const res = await fetch('http://localhost:3001/api/data/notes?perpage=0');
  const {data: notes}: NotesData = await res.json();
  const arrId: number[] = notes.map(item => item.id);
  const pagesCount = Math.ceil(Number(arrId.length) / 4);
  // eslint-disable-next-line prefer-const
  let arrDefault = [];
  for (let i = 1; i <= pagesCount; i++) {
    arrDefault.push(i);
  }
  return arrDefault;
}

export async function generateStaticParams(): Promise<{id: string}[]> {
  const arrId: number[] = await getArrayId();
  return arrId.map((ourId) => {
    return {
      id: ourId.toString()
    };
  });
}

export default async function Note({ params }: PostPageProps
): Promise<JSX.Element> {
  const { id } = params;
  const dataFourNotes = await NotesService.fetchAllNotes(id);

  if (dataFourNotes?.data.length === 0) {
    return notFound();
  }

  return (
    <div>
      {dataFourNotes !== null && dataFourNotes?.data && dataFourNotes?.data.length > 0 ?
        <ul>
          {dataFourNotes?.data.map((note) => (
            <p key={note.id}>{note.title}</p>
          ))}
        </ul>
        :
        <>
          <p>Данных нет</p>
        </>}

    </div>
  );
}
