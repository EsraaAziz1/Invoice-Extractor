# 🧾 AI Invoice Data Extractor

## Overview
AI Invoice Data Extractor is a full-stack application built with **Angular (frontend)** and **Node.js/Express (backend)** that automates invoice processing using a hybrid **OCR + AI pipeline**. The system extracts structured invoice data from uploaded files (PDF, PNG, JPG, JPEG) and converts them into clean JSON using a Google Gemini/Gemma AI agent.

---

## 🚀 Features

### 📤 File Upload
- Drag-and-drop invoice upload support
- Accepts PDF, PNG, JPG, JPEG formats

### 📄 Text Extraction
- PDF parsing using `pdf-parse`
- Image OCR using `Tesseract.js`
- Automatic detection of file type

### 🧹 Text Processing
- Noise removal and cleaning
- Normalization of extracted raw text
- Removal of system/UI logs or irrelevant content

### 🧠 AI Processing
- Uses Google Gemini / Gemma AI model
- Converts unstructured text into structured invoice JSON
- Extracts invoice fields and line items

### 🧾 Structured Output
- Invoice number
- Vendor & customer details
- Dates (invoice, due date)
- Currency, subtotal, tax, total
- Line items (description, quantity, unit price, total)
- Confidence score for extraction accuracy

### ⚙️ Backend Safety Layer
- Validates AI response before sending to frontend
- Prevents invalid values (e.g. NaN)
- Ensures consistent schema mapping
- Centralized error handling

### 🎨 Frontend UI
- Built with Angular standalone components
- Responsive design using Tailwind
- Displays invoice details in structured tables
- Confidence score visualization bar

### 🐳 Deployment
- Docker-ready full-stack application
- Supports production deployment easily

---

## ⚙️ System Workflow

1. User uploads invoice file
2. Backend detects file type
3. PDF → extracted using pdf-parse
4. Image → processed using Tesseract OCR
5. Extracted text is cleaned and normalized
6. Clean text is sent to Gemini/Gemma AI
7. AI returns structured JSON output
8. Backend validates and maps response
9. Frontend displays formatted invoice data

---

## 🧠 AI Pipeline

- OCR/PDF → Raw Text
- Text Cleaning → Structured Input
- AI Model → Invoice JSON Extraction
- Validation Layer → Safe Data Output
- Frontend → UI Rendering

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express
- TypeScript
- Tesseract.js
- pdf-parse
- Google Gemini / Gemma AI

### Frontend
- Angular
- TypeScript
- Tailwind CSS

### DevOps
- Docker

---

## 📡 API

### POST `/api/invoices/extract`

**Request:**
- multipart/form-data
- field: `invoice`

**Response:**
```json
{
  "invoiceNumber": "INV-001",
  "vendorName": "Tech Solutions",
  "customerName": "Ahmed Ali",
  "invoiceDate": "2026-05-10",
  "dueDate": "2026-05-20",
  "subtotal": 8000,
  "tax": 800,
  "totalAmount": 8800,
  "currency": "USD",
  "paymentTerms": "Net 10",
  "lineItems": [
    {
      "description": "Web Development Service",
      "quantity": 1,
      "unitPrice": 5000,
      "total": 5000
    }
  ],
  "confidenceScore": 1
}
```
## Docker

Build and run the full application with Docker:

```bash
docker build -t invoice-extractor .
docker run --env-file backend/.env -p 4000:4000 invoice-extractor
```

Then open `http://localhost:4000`.

## Notes

- Use the `frontend` app for UI and the `backend` API for extraction.
- For production, set `NODE_ENV=production` and host the backend on port `4000`.
- The backend can optionally serve the frontend build if the static `public` directory exists.
