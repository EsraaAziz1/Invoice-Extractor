# AI Invoice Data Extractor

A full-stack invoice extraction application built with Angular on the frontend and Node.js/Express on the backend. It accepts PDF, PNG, JPG, and JPEG invoices, extracts text from documents, and uses the Google Gemini/Gemma AI agent to parse structured invoice data.

## Features

- Drag-and-drop invoice upload
- PDF parsing and image OCR
- AI-powered invoice structure extraction
- Responsive Tailwind UI with Angular standalone components
- Structured invoice output with line items and confidence score
- Retry logic for AI failures
- CORS, validation, and error middleware
- Docker-ready full-stack deployment

## Folder structure

- `frontend/` - Angular application
- `backend/` - Express TypeScript API
- `Dockerfile` - full-stack production build
- `.env.example` - environment variable template

## Quick start

1. Copy environment variables:

```bash
cp backend/.env.example backend/.env
```

2. Add your Google API key to `backend/.env`:

```text
GOOGLE_API_KEY=your_google_api_key_here
```

3. Start the backend:

```bash
cd backend
npm install
npm run dev
```

4. Start the frontend:

```bash
cd frontend
npm install
npm start
```

5. Open `http://localhost:4200`

> The frontend sends requests to `/api/invoices/extract`. CORS is configured so local development works with the backend running on `http://localhost:4000`.

## API

`POST /api/invoices/extract`

Request: `multipart/form-data` with field `invoice`.

Response:

```json
{
  "invoiceNumber": "",
  "vendorName": "",
  "customerName": "",
  "invoiceDate": "",
  "dueDate": "",
  "subtotal": 0,
  "tax": 0,
  "totalAmount": 0,
  "currency": "",
  "paymentTerms": "",
  "lineItems": [
    {
      "name": "",
      "quantity": 0,
      "price": 0
    }
  ],
  "confidenceScore": 0
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
