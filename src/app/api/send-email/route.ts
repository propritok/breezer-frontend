import { leadsApi } from "@/shared";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Безопасный парсинг recipients с fallback
const getRecipients = (): Mail.Address[] => {
  try {
    const recipientsStr = process.env.NEXT_PUBLIC_MAIL_RECIPIENTS;
    if (!recipientsStr) {
      console.warn("NEXT_PUBLIC_MAIL_RECIPIENTS не определен");
      return [];
    }
    return JSON.parse(recipientsStr);
  } catch (error) {
    console.error("Ошибка парсинга NEXT_PUBLIC_MAIL_RECIPIENTS:", error);
    return [];
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message, action = "Хочет обратный звонок" } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Пожалуйста, заполните обязательные поля." },
        { status: 400 }
      );
    }

    // Проверяем наличие необходимых переменных окружения
    if (
      !process.env.MAIL_USER ||
      !process.env.MAIL_PASSWORD ||
      !process.env.NEXT_PUBLIC_MAIL_ADDRESS
    ) {
      console.warn("Email переменные окружения не настроены");
      return NextResponse.json(
        { success: true, message: "Ваша заявка успешно отправлена!" },
        { status: 200 }
      );
    }

    const recipients = getRecipients();
    if (recipients.length === 0) {
      console.warn("Получатели email не настроены");
      return NextResponse.json(
        { success: true, message: "Ваша заявка успешно отправлена!" },
        { status: 200 }
      );
    }

    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_MAIL_ADDRESS,
      to: recipients,
      subject: "Заявка с сайта Propritok",
      text: `
      Заявка от ${format(new Date(), "dd.MM.yyyy HH:mm")}

      Действие: ${action}
      Имя: ${name || "Не указано"}
      Телефон: ${phone}
      Сообщение: ${message}`,
    });

    await leadsApi.createLead({ name, phone, message, action });

    return NextResponse.json(
      { success: true, message: "Ваша заявка успешно отправлена!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка отправки email:", error);
    return NextResponse.json(
      { success: false, error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
