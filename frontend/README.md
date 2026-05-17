# Invoice Extractor Frontend

Modern Angular 18 standalone application for AI-powered invoice extraction.

## Features

- **Invoice Upload**: Drag-and-drop or click to upload PDF/image files
- **OCR Extraction**: Automatic data extraction using AI
- **Results Display**: View extracted invoice data in a formatted table
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Validation**: File type and size validation

## Technology Stack

- **Framework**: Angular 18 (Standalone Components)
- **Styling**: CSS3 with responsive design
- **HTTP Client**: @angular/common/http
- **Build Tool**: Angular CLI

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
npm start
```

The app will open automatically at `http://localhost:4200`

## Build

```bash
npm run build
```

For production build:

```bash
npm run build:prod
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── upload/          # File upload component
│   │   ├── invoice-table/   # Results display component
│   │   └── loader/          # Loading spinner component
│   ├── services/
│   │   └── api.service.ts   # Backend API client
│   ├── models/
│   │   └── invoice.model.ts # TypeScript interfaces
│   ├── app.component.ts     # Root component
│   ├── app.config.ts        # App configuration
│   ├── app.routes.ts        # Routing configuration
│   └── main.ts              # Entry point
├── index.html               # HTML template
├── styles.css              # Global styles
└── polyfills.ts            # Browser polyfills

public/
├── favicon.ico
└── assets/
```

## API Integration

The frontend connects to the backend API at `http://localhost:4000/api`

### Extract Endpoint

- **POST** `/api/invoices/extract`
- **Body**: FormData with `invoice` file
- **Response**: ExtractApiResponse with InvoiceData

## Configuration

Backend API URL is configured in [src/app/services/api.service.ts](src/app/services/api.service.ts)

```typescript
private readonly apiUrl = 'http://localhost:4000/api';
```

## Supported File Types

- PDF files (.pdf)
- PNG images (.png)
- JPEG images (.jpg, .jpeg)

Maximum file size: 10MB

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
