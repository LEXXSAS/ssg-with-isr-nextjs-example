import { revalidateForTagData } from '@/lib/actions';
import Link from 'next/link';
import { Button } from './ui/button';

interface ITodo {
  id: number
  title: string
}

interface ITodos {
  todos: ITodo[]
  id: number;
  title: string;
}

export async function getData(): Promise<ITodos[]> {
  const res = await fetch('http://localhost:3001/todos', {
    next: {
      tags: ['todos'],
      revalidate: 15
    }
  });
  const todos: ITodos[] = await res.json();
  return todos;
}

const DataPage = async (): Promise<JSX.Element> => {
  const todosdata = await getData();
  return (
    <div className="container mx-auto">
      <form
        action={revalidateForTagData}>
        <Button
          className="bg-slate-500 hover:bg-slate-600 transition-all duration-300 active:bg-slate-700"
          variant={'default'}
          size={'default'}>
          <span className="text-base">
            Revalidate todos
          </span>
        </Button>
      </form>
      <div className='mb-2 mt-2'>
        <h3 className='font-mono text-lg'>Todos json data</h3>
      </div>
      <div className='border-slate-500 rounded-md border-dashed border-2 pt-2 pb-2 pl-2 pr-4 w-96'>
        <p>{JSON.stringify(todosdata, null, 2)}</p>
      </div>
      <div className='flex flex-col w-80 items-start'>
        <div className="mt-4">
          <h3 className="text-lg">All Todos:</h3>
        </div>
        <div className='border-slate-500 rounded-md border-dashed border-2 pt-2 pb-2 pl-2 pr-4 mt-2'>
          <ul>
            {todosdata.map((todo: ITodos) => (
              <Link key={todo.id} href={`/todo/${todo.id}`}>
                <li key={todo.id}>
                  <button
                    className='bg-slate-400 hover:bg-slate-500 transition-all duration-300 active:bg-slate-600 mb-1 p-2 rounded-sm text-white w-full text-left'>
                    post: {todo.id} {todo.title.length > 15 ? todo.title.slice(0, 15) + '...' : todo.title}
                  </button>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ); 
};

export default DataPage;
