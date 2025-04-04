export type Lang = "en" | "ru";

type MessageStructure = {
  auth: {
    loginSuccess: string;
    registerSuccess: string;
  };
  invoice: {
    created: string;
    paid: string;
    title: string;
    client: string;
    meshType: string;
    quantity: string;
    unitPrice: string;
    total: string;
    date: string;
    emailSubject: string;
    emailBody: string;
  };
  errors: {
    notFound: string;
    unauthorized: string;
  };
};

export const messages: Record<Lang, MessageStructure> = {
  en: {
    auth: {
      loginSuccess: "Login successful",
      registerSuccess: "User registered successfully",
    },
    invoice: {
      created: "Invoice has been created",
      paid: "Payment recorded",
      title: "Invoice",
      client: "Client",
      meshType: "Mesh Type",
      quantity: "Quantity",
      unitPrice: "Price per unit",
      total: "Total",
      date: "Date",
      emailSubject: "Your Invoice",
      emailBody: "Thank you for your purchase. See attached invoice.",
    },
    errors: {
      notFound: "Not found",
      unauthorized: "Unauthorized",
    },
  },
  ru: {
    auth: {
      loginSuccess: "Вход выполнен успешно",
      registerSuccess: "Пользователь зарегистрирован",
    },
    invoice: {
      created: "Счет был создан",
      paid: "Платеж зарегистрирован",
      title: "Счет",
      client: "Клиент",
      meshType: "Тип сетки",
      quantity: "Количество",
      unitPrice: "Цена за единицу",
      total: "Итого",
      date: "Дата",
      emailSubject: "Ваш счет",
      emailBody: "Спасибо за покупку. Счет прилагается.",
    },
    errors: {
      notFound: "Не найдено",
      unauthorized: "Нет доступа",
    },
  },
};

export const t = (key: string, lang: Lang = "en"): string => {
  const parts = key.split(".");
  let val: any = messages[lang as Lang];

  for (const part of parts) {
    val = val?.[part];
    if (val === undefined) break;
  }

  return typeof val === "string" ? val : key;
};
