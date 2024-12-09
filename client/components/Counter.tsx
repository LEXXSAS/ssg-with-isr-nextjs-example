'use client';
import { useState } from 'react';
import MainButton from './Button/MainButton';

export const Counter = (): JSX.Element => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <MainButton
        className="bg-slate-500 hover:bg-slate-600 transition-all duration-300 active:bg-slate-700"
        variant="default"
        size="default"
        onClick={() => setCount((count) => count + 1)}
      >
        {count} + 1
      </MainButton>
    </div>
  );
};
