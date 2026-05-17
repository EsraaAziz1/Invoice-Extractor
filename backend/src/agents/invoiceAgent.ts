import { client, MODEL } from "./client";
import { extractText } from "./extractText";
import { cleanText } from "./cleanText";
import { SYSTEM_PROMPT } from "./prompt";
import { InvoiceData } from "../interfaces/invoice.interface";
import { log } from "console";

function safeJSON(text: string) {
  try {
    const cleaned = text
      .replace(/```json|```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.log("❌ RAW BAD OUTPUT:", text);
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }

    return null;
  }
}
function safeNumber(value: any) {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

function mapInvoice(raw: any): InvoiceData {
  return {
    invoiceNumber: raw?.invoiceNumber ?? null,
    vendorName: raw?.vendorName ?? null,
    customerName: raw?.customerName ?? null,
    invoiceDate: raw?.invoiceDate ?? null,
    dueDate: raw?.dueDate ?? null,

    subtotal: safeNumber(raw?.subtotal),
    tax: safeNumber(raw?.tax),
    totalAmount: safeNumber(raw?.totalAmount),

    currency: raw?.currency || "USD",
    paymentTerms: raw?.paymentTerms ?? null,

    lineItems: Array.isArray(raw?.lineItems) ? raw.lineItems : [],

    confidenceScore: safeNumber(raw?.confidenceScore),
  };
}

export async function runInvoiceAgent(
  filePath: string,
  mimeType: string
): Promise<InvoiceData> {
  try {
    // 1️⃣ Extract text
    const rawText = await extractText(filePath, mimeType);

    // 2️⃣ Clean text
    const text = cleanText(rawText);
    console.log("🧾 CLEAN TEXT:", text);

    // 3️⃣ Call model
    const response = await client.chat.completions.create({
      model: MODEL,
      temperature: 0,
      max_tokens: 1500,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Extract invoice data from this text:\n\n${text}`,
        },
      ],
    });

    const output = response.choices[0]?.message?.content || "";

    console.log("✅ RAW MODEL OUTPUT:", output);
    // 4️⃣ Parse safely
    const parsed = safeJSON(output);

    if (!parsed) {
      throw new Error("Model returned invalid JSON");
    }

    return mapInvoice(parsed);
  } catch (error: any) {
    throw new Error("Invoice agent failed: " + error.message);
  }
}