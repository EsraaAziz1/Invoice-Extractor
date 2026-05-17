import fs from "fs";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";

export async function extractText(filePath: string, mimeType: string) {
  const buffer = fs.readFileSync(filePath);

  try {
    // 📄 PDF
    if (mimeType === "application/pdf") {
      const pdf = await pdfParse(buffer);

      // لو النص ضعيف → OCR بدل throw error
      if (!pdf.text || pdf.text.trim().length < 50) {
        console.warn("⚠️ Low-quality PDF text → switching to OCR");

        const result = await Tesseract.recognize(buffer, "eng");
        return result.data.text;
      }

      return pdf.text;
    }

    // 🖼️ IMAGE OCR
    const result = await Tesseract.recognize(filePath, "eng");
    return result.data.text;

  } catch (err) {
    console.error("❌ extractText error:", err);

    // fallback أخير
    const result = await Tesseract.recognize(filePath, "eng");
    return result.data.text;
  }
}