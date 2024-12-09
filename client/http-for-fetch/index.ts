import { NotesData } from '@/components/NoteByPriority';

export default class NotesService {
  static fetchByPriorityOrAllNotes = async (selectedPriority: string): Promise<NotesData | null> => {
    if (!selectedPriority) return null;
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+`/api/data/notesbypriority/?priority=${selectedPriority}`,
        { 
          cache: 'no-store',
          next: {
            revalidate: 0
          }
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!response.ok) return null;
      const notes = await response.json();
      return notes;
    } catch (err: unknown) {
      return null;
    }
  };
  static fetchAllNotes = async (id: string): Promise<NotesData | null> => {
    try {
      const idI = Number(id) - 1;
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+`/api/data/nextpageandpagination/?currentpage=${idI}&prioritynext=all&searchvaluenext=`,
        { 
          next: {
            revalidate: 10
          }
        }
      );
      if (!response.ok) return null;
      const notes = await response.json();
      return notes;
    } catch (err: unknown) {
      return null;
    }
  };
}
