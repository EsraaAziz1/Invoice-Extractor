import { runInvoiceAgent } from "../agents/invoiceAgent";

export const extractInvoice = async (req: any, res: any) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await runInvoiceAgent(file.path, file.mimetype);

    return res.json({
      success: true,
      data: result,
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};