import { ContactCTAButton } from "@/features";
import { SiteBreadcrumbs } from "@/widgets";
import Head from "next/head";
import React from "react";

const CertificatesPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Процесс работы - PROPRITOK</title>
        <meta
          name="description"
          content="Узнайте, как происходит установка бризера от PROPRITOK. 5 простых этапов от заявки до чистого воздуха в вашем доме."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        <SiteBreadcrumbs pageTitle="Процесс работы" />

        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Процесс работы{" "}
            <span className="text-[var(--secondary-color)]">PROPRITOK</span>
          </h1>

          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Мы делаем процесс установки бризера максимально простым и
            прозрачным. От первого звонка до чистого воздуха в вашем доме всего
            5 этапов.
          </p>

          {/* Первый этап */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="bg-[var(--secondary-color)] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-6">
                1
              </div>
              <h2 className="text-3xl font-bold text-[var(--secondary-color)]">
                Первый этап
              </h2>
            </div>

            <div className="bg-gradient-to-r from-[var(--secondary-color)] to-[#B8F0EE] p-8 rounded-lg text-white">
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <p className="text-lg">
                    Вы принимаете решение дышать чистым воздухом ежедневно
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <p className="text-lg">
                    Знакомитесь с доступными моделями Бризеров на нашем сайте
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <p className="text-lg">
                    Оставляете заявку на консультацию, с указанием удобного
                    способа связи
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Второй этап */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="bg-[var(--secondary-color)] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-6">
                2
              </div>
              <h2 className="text-3xl font-bold text-[var(--secondary-color)]">
                Второй этап
              </h2>
            </div>

            <div className="bg-white border-2 border-[var(--secondary-color)] p-8 rounded-lg">
              <p className="text-xl text-gray-800 mb-6 font-semibold">
                С вами связывается наш менеджер и отвечает на все интересующие
                вас вопросы.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[var(--secondary-color)] mb-3">
                    Помощь в выборе
                  </h3>
                  <p className="text-gray-700">
                    Помогает определиться с моделью Бризера и их количеством,
                    исходя из ваших пожеланий и возможностей установки в
                    помещении
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[var(--secondary-color)] mb-3">
                    Информация и согласование
                  </h3>
                  <p className="text-gray-700">
                    Рассказывает о возможных вариантах оплаты/предоплаты,
                    гарантий на монтаж и устройства, дополнительных возможностей
                    монтажа. Согласовывает дату и время для консультации с
                    инженером.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Третий этап */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="bg-[var(--secondary-color)] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-6">
                3
              </div>
              <h2 className="text-3xl font-bold text-[var(--secondary-color)]">
                Третий этап
              </h2>
            </div>

            <div className="bg-gradient-to-br from-[var(--secondary-color)] to-[#B8F0EE] p-8 rounded-lg text-white">
              <p className="text-xl mb-6 font-semibold">
                Индивидуальная консультация инженера по техническим вопросам
                монтажа.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <p className="text-lg">
                    По фото и видео, определяет техническую возможность
                    реализации монтажа
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <p className="text-lg">Составление сметы монтажных работ</p>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <p className="text-lg">
                    Составление технического задания для монтажника
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <p className="text-lg">
                    Выбор даты монтажа и установки Бризера
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Четвертый этап */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="bg-[var(--secondary-color)] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-6">
                4
              </div>
              <h2 className="text-3xl font-bold text-[var(--secondary-color)]">
                Четвертый этап
              </h2>
            </div>

            <div className="bg-white border-2 border-[var(--secondary-color)] p-8 rounded-lg">
              <p className="text-xl text-gray-800 mb-6 font-semibold">
                Оказание сметы услуг
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3 text-[var(--secondary-color)]">
                    •
                  </span>
                  <p className="text-lg text-gray-700">
                    Выезд монтажника на объект в заранее согласованный день и по
                    предварительному звонку
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3 text-[var(--secondary-color)]">
                    •
                  </span>
                  <p className="text-lg text-gray-700">
                    Выполнение качественного монтажа
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3 text-[var(--secondary-color)]">
                    •
                  </span>
                  <p className="text-lg text-gray-700">
                    Установка и подключение Бризера
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3 text-[var(--secondary-color)]">
                    •
                  </span>
                  <p className="text-lg text-gray-700">
                    Демонстрация устройства
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3 text-[var(--secondary-color)]">
                    •
                  </span>
                  <p className="text-lg text-gray-700">
                    Подписание акта работ и гарантийных талонов
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Пятый этап */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="bg-[var(--secondary-color)] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-6">
                5
              </div>
              <h2 className="text-3xl font-bold text-[var(--secondary-color)]">
                Пятый этап
              </h2>
            </div>

            <div className="bg-gradient-to-r from-[var(--secondary-color)] to-[#B8F0EE] p-8 rounded-lg text-white text-center">
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <span className="text-2xl mr-3">•</span>
                  <p className="text-xl">Оплата монтажных работ</p>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-2xl mr-3">•</span>
                  <p className="text-xl font-bold">
                    Радость от притока чистого воздуха
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Заключение */}
          <div className="text-center bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-[var(--secondary-color)] mb-4">
              Готовы начать?
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Оставьте заявку на консультацию, и мы проведем вас через весь
              процесс от первого звонка до чистого воздуха в вашем доме!
            </p>
            <ContactCTAButton
              size="lg"
              formButtonLabel="Перезвоните мне"
              action="Заявка со страницы Процесс работы"
              label="Оставить заявку "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificatesPage;
