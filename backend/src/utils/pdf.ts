import PDFDocument from "pdfkit";
import fs from "fs";
import { t } from "../i18n/messages";
import { Lang } from "../i18n/messages";

export const generateInvoicePDF = async (
  invoiceData: any,
  outputPath: string,
  lang: string = "en"
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);

    doc
      .fontSize(20)
      .text(t("invoice.title", lang as Lang), { align: "center" });
    doc.moveDown();
    doc
      .fontSize(14)
      .text(`${t("invoice.client", lang as Lang)}: ${invoiceData.clientName}`);
    doc.text(`${t("invoice.meshType", lang as Lang)}: ${invoiceData.meshType}`);
    doc.text(`${t("invoice.quantity", lang as Lang)}: ${invoiceData.quantity}`);
    doc.text(
      `${t("invoice.unitPrice", lang as Lang)}: ${invoiceData.pricePerUnit}`
    );
    doc.text(`${t("invoice.total", lang as Lang)}: ${invoiceData.total}`);
    doc.text(
      `${t("invoice.date", lang as Lang)}: ${new Date(
        invoiceData.createdAt
      ).toLocaleDateString(lang)}`
    );

    doc.end();

    stream.on("finish", () => resolve());
    stream.on("error", (err) => reject(err));
  });
};
