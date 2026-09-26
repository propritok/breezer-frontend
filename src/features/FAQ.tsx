'use client';

import { Question, questionsApi } from '@/shared/api';
import { useEffect, useState } from 'react';

interface FAQProps {
  maxQuestions?: number;
}

// Аккордеон вопросов (данные из PocketBase). Заголовок и раскладку задаёт FAQSection
const FAQ: React.FC<FAQProps> = ({ maxQuestions }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await questionsApi.getQuestions();
        const items = maxQuestions ? response.items.slice(0, maxQuestions) : response.items;
        setQuestions(items);
        setOpenId(items[0]?.id ?? null);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить вопросы');
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [maxQuestions]);

  if (loading) {
    return (
      <div className='space-y-3'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='h-16 rounded-2xl bg-white/70 animate-pulse' />
        ))}
      </div>
    );
  }

  if (error) return <p className='text-ink-2'>{error}</p>;
  if (questions.length === 0) return <p className='text-ink-2'>Вопросы не найдены</p>;

  return (
    <div>
      {questions.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className='border-b border-line'>
            <button
              type='button'
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              className='w-full flex justify-between items-center gap-6 py-5 md:py-6 text-left font-bold text-[17px] md:text-lg tracking-[-0.01em] hover:text-brand-700 transition-colors'>
              {item.question}
              <span
                className={`relative w-9 h-9 shrink-0 rounded-full transition-all duration-300 ${
                  open ? 'bg-brand-700 rotate-180' : 'bg-brand-50'
                }`}
                aria-hidden='true'>
                <span
                  className={`absolute left-1/2 top-1/2 w-3 h-0.5 -translate-x-1/2 -translate-y-1/2 rounded ${
                    open ? 'bg-white' : 'bg-brand-700'
                  }`}
                />
                <span
                  className={`absolute left-1/2 top-1/2 w-3 h-0.5 -translate-x-1/2 -translate-y-1/2 rounded transition-transform duration-300 ${
                    open ? 'bg-white rotate-0' : 'bg-brand-700 rotate-90'
                  }`}
                />
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}>
              <div className='overflow-hidden'>
                <p className='pb-6 pr-12 text-ink-2 leading-relaxed whitespace-pre-wrap'>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;
