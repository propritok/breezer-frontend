'use client';

import { Question, questionsApi } from '@/shared/api';
import { useEffect, useState } from 'react';

interface FAQProps {
  title?: string;
  maxQuestions?: number;
}

const FAQ: React.FC<FAQProps> = ({ title = 'Часто задаваемые вопросы', maxQuestions }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await questionsApi.getQuestions();
        let questionsToShow = response.items;

        // Ограничиваем количество вопросов если указано
        if (maxQuestions) {
          questionsToShow = response.items.slice(0, maxQuestions);
        }

        setQuestions(questionsToShow);
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
      <section>
        <div className='max-w-4xl mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center text-gray-900 mb-8'>{title}</h2>
          <div className='space-y-4'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='bg-white rounded-lg p-6 shadow-sm animate-pulse'>
                <div className='h-6 bg-gray-200 rounded mb-3'></div>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8'>{title}</h2>
          <p className='text-red-600'>{error}</p>
        </div>
      </section>
    );
  }

  if (questions.length === 0) {
    return (
      <section>
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8'>{title}</h2>
          <p className='text-gray-600'>Вопросы не найдены</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className='max-w-4xl mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center text-gray-900 mb-8'>{title}</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {questions.map((item) => (
            <div
              key={item.id}
              className='bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow'>
              <div className='p-6'>
                <h3 className='text-lg font-semibold text-[var(--secondary-color)] mb-3 leading-tight'>
                  {item.question}
                </h3>
                <div className='border-t border-gray-100 pt-3'>
                  <p className='text-gray-900 leading-relaxed whitespace-pre-wrap text-sm'>
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
