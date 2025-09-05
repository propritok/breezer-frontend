// src/features/BubbleFilters.tsx
import React from 'react';

type Props = {
  items: string[];
  selected: string[];
  onChange(selected: string[]): void;
};

const ACTIVE_CLASS = 'bg-[var(--secondary-color)] text-white border-[var(--secondary-color)]';
const INACTIVE_CLASS = 'bg-white text-gray-700 border-gray-300 hover:border-gray-400';
const BASE_CLASS = 'shrink-0 rounded-full border px-4 py-2 text-sm transition';

const BubbleFilters: React.FC<Props> = ({ items, selected, onChange }) => {
  const isSelected = (v: string) => selected.includes(v);

  const toggle = (v: string) => {
    if (v === '__ALL__') return onChange([]);
    if (isSelected(v)) onChange(selected.filter((s) => s !== v));
    else onChange([...selected, v]);
  };

  return (
    <div className='w-full'>
      <div
        className='
          -mx-4 px-4
          flex gap-2 overflow-x-auto
          flex-wrap
        '>
        <button
          type='button'
          onClick={() => toggle('__ALL__')}
          className={[BASE_CLASS, selected.length === 0 ? ACTIVE_CLASS : INACTIVE_CLASS].join(' ')}>
          Все
        </button>

        {items.map((b) => (
          <button
            key={b}
            type='button'
            onClick={() => toggle(b)}
            className={[BASE_CLASS, isSelected(b) ? ACTIVE_CLASS : INACTIVE_CLASS].join(' ')}>
            {b}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BubbleFilters;
