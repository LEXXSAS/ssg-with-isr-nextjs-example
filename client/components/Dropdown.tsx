'use client';

import type { ChangeEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const options = ['all', 'low', 'high', 'middle'];

export const DropDown = ({ selected }: { selected: string }): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    const current = new URLSearchParams(searchParams);
    const value = event.target.value.trim();

    if (!value) {
      current.delete('priority');
    } else {
      current.set('priority', event.target.value);
    }

    const query = current.toString() ? `?${current.toString()}` : '';

    router.push(`${pathname}${query}`);
  };

  return (
    <>
      <select
        value={selected}
        onChange={onSelect}
      >
        <option value="">Выбор приоритета</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </>
  );
};
