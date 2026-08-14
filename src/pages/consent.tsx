import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const ConsentPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Согласие на обработку персональных данных - Propritok</title>
        <meta
          name='description'
          content='Согласие на обработку персональных данных посетителей сайта Propritok'
        />
        <meta name='robots' content='noindex, follow' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 py-12'>
          <div className='bg-white rounded-lg shadow-sm p-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>
              Согласие на обработку персональных данных
            </h1>

            <div className='prose prose-lg max-w-none space-y-4'>
              <p className='text-gray-700 leading-relaxed'>
                Я, действуя свободно, своей волей и в своём интересе, в соответствии со ст. 9
                Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных», отправляя форму
                на сайте https://propritok.ru/, даю согласие ИП Смирнову Илье Вячеславовичу (ОГРНИП
                318774600572015, ИНН 772301109753, e-mail: propritok@yandex.ru) (далее — Оператор) на
                обработку моих персональных данных на условиях, изложенных ниже.
              </p>

              <div>
                <h2 className='text-2xl font-semibold text-gray-800 mb-3'>
                  1. Перечень персональных данных
                </h2>
                <ul className='list-disc list-inside space-y-1 text-gray-700'>
                  <li>имя;</li>
                  <li>номер телефона;</li>
                  <li>содержание сообщения, оставленного в форме обратной связи.</li>
                </ul>
              </div>

              <div>
                <h2 className='text-2xl font-semibold text-gray-800 mb-3'>2. Цели обработки</h2>
                <ul className='list-disc list-inside space-y-1 text-gray-700'>
                  <li>обработка заявки и обратная связь с посетителем сайта;</li>
                  <li>консультирование по товарам и услугам Оператора;</li>
                  <li>заключение и исполнение договора по инициативе субъекта персональных данных.</li>
                </ul>
              </div>

              <div>
                <h2 className='text-2xl font-semibold text-gray-800 mb-3'>
                  3. Перечень действий с персональными данными
                </h2>
                <p className='text-gray-700 leading-relaxed'>
                  Сбор, запись, систематизация, накопление, хранение, уточнение (обновление,
                  изменение), извлечение, использование, передача (предоставление, доступ),
                  блокирование, удаление, уничтожение персональных данных. Обработка осуществляется
                  как с использованием средств автоматизации, так и без их использования.
                </p>
              </div>

              <div>
                <h2 className='text-2xl font-semibold text-gray-800 mb-3'>4. Срок действия согласия</h2>
                <p className='text-gray-700 leading-relaxed'>
                  Согласие действует с момента его предоставления до достижения целей обработки
                  персональных данных или до его отзыва. Согласие может быть отозвано в любой момент
                  путём направления уведомления на адрес электронной почты Оператора{' '}
                  <a
                    href='mailto:propritok@yandex.ru'
                    className='text-blue-600 hover:text-blue-800 underline'>
                    propritok@yandex.ru
                  </a>{' '}
                  с пометкой «Отзыв согласия на обработку персональных данных».
                </p>
              </div>

              <div>
                <h2 className='text-2xl font-semibold text-gray-800 mb-3'>5. Прочие условия</h2>
                <p className='text-gray-700 leading-relaxed'>
                  Порядок и условия обработки персональных данных определяются{' '}
                  <Link href='/privacy' className='text-blue-600 hover:text-blue-800 underline'>
                    Политикой в отношении обработки персональных данных
                  </Link>
                  , размещённой по адресу https://propritok.ru/privacy. Я подтверждаю, что
                  ознакомлен(а) с указанной Политикой и с правами субъекта персональных данных,
                  предусмотренными Законом о персональных данных.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsentPage;
