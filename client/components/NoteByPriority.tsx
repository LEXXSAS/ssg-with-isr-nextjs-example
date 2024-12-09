'use server';
import NotesService from '@/http-for-fetch';
import { DropDown } from './Dropdown';

export interface NotesData {
  data: Note[]
  count: number
  pages: number
}

export interface Note {
  id: number
  title: string
  author: string
  body: string
  priority: string
}

// const getDataMain = async(selected: string): Promise<NotesData | void | null> => {
//   const res = await NotesService.fetchByPriorityOrAllNotes(selected);
//   return res;
// };

export default async function NotesByPriority({ searchParams }:
  {
    searchParams?: { [key: string]: string | string[] | undefined };
  }
): Promise<JSX.Element> {
  console.log('searchParams => ', searchParams);
  const selectedSearch = searchParams?.priority ?? '';
  const selected = Array.isArray(selectedSearch) ? selectedSearch[0] : selectedSearch;
  console.log('selected => ', selected);

  const dataNotes = await NotesService.fetchByPriorityOrAllNotes(selected);

  // const dataNotes = await getDataMain(selected)

  return (
    <div>
      <DropDown selected={selected || ''} />

      {selected ?
        <pre>
          Вы выбрали {selected}
        </pre>
        :
        <pre>
          Ничего не выбрано
        </pre>
      }
      {dataNotes !== null && dataNotes?.data && dataNotes?.data.length > 0 ?
        <ul>
          {dataNotes?.data.map((note) => (
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
