'use server';

import Mail from 'nodemailer/lib/mailer';

// const transporter = nodemailer.createTransport({
//   host: 'smtp.yandex.ru',
//   port: 587,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASSWORD,
//   },
// });

const recipients: Mail.Address[] = JSON.parse(process.env.NEXT_PUBLIC_MAIL_RECIPIENTS as string);

export async function handleCallbackForm(
  data: {
    name: string;
    phone: string;
  },
  action: string = 'Хочет обратный звонок',
) {
  if (!data.phone) {
    return { success: false, message: 'Пожалуйста, заполните обязательные поля.' };
  }

  try {
    // await transporter.sendMail({
    //   from: process.env.NEXT_PUBLIC_MAIL_ADDRESS,
    //   to: recipients,
    //   subject: 'Заявка с сайта Propritok',
    //   text: `
    //   Заявка от ${format(new Date(), 'dd.MM.yyyy HH:mm')}

    //   Действие: ${action}
    //   Имя: ${data.name || 'Не указано'}
    //   Телефон: ${data.phone}`,
    // });

    return { success: true };
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    return { success: false, error: 'Ошибка сервера' };
  }
}
