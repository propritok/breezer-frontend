import { Card, CardBody } from "@heroui/react";
import { ContactFormCTA } from "@/shared/ui";
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Контакты - Propritok</title>
        <meta
          name="description"
          content="Свяжитесь с нами для заказа бризеров"
        />
      </Head>

      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Контакты</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4 mb-8">
                  <div>
                    <h3 className="font-semibold mb-2">Телефон:</h3>
                    <p className="text-gray-600">+79295850880</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Email:</h3>
                    <p className="text-gray-600">info@propritok.ru</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Адрес:</h3>
                    <p className="text-gray-600">
                      г. Москва, ул. Примерная, д. 123
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Режим работы:</h3>
                    <p className="text-gray-600">
                      Пн-Пт: 9:00 - 18:00
                      <br />
                      Сб-Вс: 10:00 - 16:00
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Реквизиты:</h3>
                    <div className="flex flex-col space-y-1 text-gray-600">
                      <span>ИП Смирнов Илья Вячеславович</span>
                      <span>ОГРНИП: 318774600572015</span>
                      <span>ИНН: 772301109753</span>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-[var(--secondary-color)] to-[#B8F0EE] px-6 py-4">
                  <h3 className="text-2xl font-bold text-white">
                    Связаться с нами
                  </h3>
                </div>
                <CardBody>
                  <ContactFormCTA
                    showMessageField
                    action="Заявка со страницы Контакты"
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
