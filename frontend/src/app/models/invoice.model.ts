export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceData {
  invoiceNumber: string | null;
  vendorName: string | null;
  customerName: string | null;
  invoiceDate: string | null;
  dueDate: string | null;
  subtotal: number;
  tax: number;
  totalAmount: number;
  currency: string;
  paymentTerms: string | null;
  lineItems: InvoiceLineItem[];
  confidenceScore: number;
}

export interface ExtractApiResponse {
  success: boolean;
  data?: InvoiceData;
  message?: string;
}
