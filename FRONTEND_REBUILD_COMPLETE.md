# Angular Frontend Rebuild - Complete Documentation

## Project Overview

A modern Angular 18 standalone application for AI-powered invoice extraction with OCR capabilities.

### Key Features

✅ **Modern Angular 18** - Latest standalone component architecture  
✅ **No SSR/Hydration** - Pure CSR (Client-Side Rendering)  
✅ **Clean Architecture** - Organized component and service structure  
✅ **Type-Safe** - Full TypeScript with strict mode enabled  
✅ **Responsive Design** - Mobile-first CSS approach  
✅ **HTTP Client** - Integrated with backend API  
✅ **No NG0908 Errors** - Proper dependency injection setup  

---

## Complete Folder Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── loader/
│   │   │   │   └── loader.component.ts           # Loading spinner
│   │   │   ├── upload/
│   │   │   │   └── upload.component.ts           # File upload with drag-drop
│   │   │   └── invoice-table/
│   │   │       └── invoice-table.component.ts    # Results display
│   │   │
│   │   ├── services/
│   │   │   └── api.service.ts                    # HTTP client service
│   │   │
│   │   ├── models/
│   │   │   └── invoice.model.ts                  # TypeScript interfaces
│   │   │
│   │   ├── app.component.ts                      # Root component
│   │   ├── app.config.ts                         # App configuration
│   │   ├── app.routes.ts                         # Routing setup
│   │   └── main.ts                               # Entry point
│   │
│   ├── environments/
│   │   ├── environment.ts                        # Development env
│   │   └── environment.prod.ts                   # Production env
│   │
│   ├── index.html                                # HTML template
│   ├── styles.css                                # Global styles
│   ├── polyfills.ts                              # Browser polyfills
│   └── main.ts                                   # Bootstrap
│
├── angular.json                                  # Angular CLI config
├── tsconfig.json                                 # TypeScript config
├── tsconfig.app.json                             # App TypeScript config
├── tsconfig.spec.json                            # Test TypeScript config
├── package.json                                  # Dependencies
├── .gitignore                                    # Git ignore rules
├── .browserslistrc                               # Browser support
└── README.md                                     # Project README
```

---

## Installation Instructions

### Prerequisites

- Node.js ≥ 18.0.0
- npm ≥ 9.0.0
- Angular CLI 18.x (installed via npm)

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

**Expected output:**
```
added 280 packages in X seconds
```

### Step 2: Verify Installation

```bash
npm list @angular/core
```

**Expected output:**
```
└── @angular/core@18.0.0
```

---

## Running the Application

### Development Server

Start with automatic browser open:
```bash
npm start
```

Or with explicit port:
```bash
npm run dev
```

**Expected output:**
```
✔ Compiled successfully.
✔ Built successfully.

Initial Chunk Files   | Names         |  Raw size
vendor.js             | vendor        |   2.89 MB |
main.js               | main          |  65.74 kB |
styles.css            | styles        |   3.37 kB |

Application bundle generation complete. [X seconds]

Watch mode enabled. [Ctrl+C] to stop.
```

Access the app at: **http://localhost:4200**

### Production Build

```bash
npm run build:prod
```

Output will be in `dist/invoice-extractor/`

---

## Key Configuration Files

### `app.config.ts`
Bootstraps the standalone application with:
- Router configuration
- HTTP client with Fetch API backend
- Animation module

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations()
  ]
};
```

### `app.routes.ts`
Simple routing configuration:
```typescript
export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '' }
];
```

### `api.service.ts`
Backend API client:
```typescript
private readonly apiUrl = 'http://localhost:4000/api';

extractInvoice(file: File): Observable<ExtractApiResponse> {
  const formData = new FormData();
  formData.append('invoice', file);
  return this.http.post<ExtractApiResponse>(
    `${this.apiUrl}/invoices/extract`,
    formData
  );
}
```

---

## Component Architecture

### 1. **AppComponent** (Root)
- Main container and orchestrator
- Manages loading state and error messages
- Coordinates file upload with API calls
- Displays results table

### 2. **UploadComponent** (Standalone)
- File input with drag-drop support
- File validation (type, size)
- Error messages
- Upload button control

### 3. **InvoiceTableComponent** (Standalone)
- Displays extracted invoice data
- Shows line items in table
- Displays totals and confidence score
- Formatted currency display

### 4. **LoaderComponent** (Standalone)
- Animated loading spinner
- Customizable loading message
- Conditional rendering based on `isLoading` input

---

## API Integration

### Backend Endpoint

**POST** `http://localhost:4000/api/invoices/extract`

**Request:**
```
Content-Type: multipart/form-data
Body: FormData with 'invoice' file
```

**Response:**
```json
{
  "success": true,
  "data": {
    "invoiceNumber": "INV-2024-001",
    "vendorName": "Acme Corp",
    "customerName": "Customer Inc",
    "invoiceDate": "2024-01-15",
    "dueDate": "2024-02-15",
    "subtotal": 1000.00,
    "tax": 100.00,
    "totalAmount": 1100.00,
    "currency": "USD",
    "paymentTerms": "NET 30",
    "lineItems": [
      {
        "name": "Product 1",
        "quantity": 2,
        "unitPrice": 500.00,
        "total": 1000.00
      }
    ],
    "confidenceScore": 0.95
  }
}
```

---

## TypeScript Interfaces

### InvoiceModel

```typescript
export interface InvoiceLineItem {
  name: string;
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
```

---

## Styling

### Global Styles (`styles.css`)

- Modern gradient background
- Card-based layout
- Responsive grid system
- Proper color scheme
- Mobile breakpoints at 768px

### Component Styles

All components use inline `styles` property with:
- Scoped component styling
- Responsive design
- Smooth transitions
- Proper accessibility colors

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | Latest  |
| Firefox | Latest  |
| Safari  | Latest  |
| Edge    | Latest  |

---

## Build Configuration

### Development Build
```bash
npm run dev
```
- Source maps enabled
- No optimization
- Fast rebuild
- Named chunks

### Production Build
```bash
npm run build:prod
```
- Optimized bundle
- Source maps disabled
- AOT compilation
- Minified output

**Output Statistics:**
```
vendor.js (Gzipped: ~850 KB)
main.js (Gzipped: ~15 KB)
styles.css (Gzipped: ~1 KB)
Total: ~3.08 MB
```

---

## Troubleshooting

### Port 4200 Already in Use

```bash
ng serve --port 4300
```

### Backend Not Responding

Check backend is running:
```bash
curl http://localhost:4000/api
```

### Build Errors

Clear cache and rebuild:
```bash
rm -r dist node_modules .angular
npm install
npm start
```

### CORS Issues

Verify backend CORS config allows `http://localhost:4200`:
```typescript
app.use(cors({ origin: 'http://localhost:4200' }));
```

---

## Development Workflow

### File Changes Auto-Reload

The dev server watches for file changes and automatically rebuilds and reloads:

```bash
npm start
# Make changes to files
# Browser auto-refreshes
```

### Debugging

Open browser DevTools (F12) and use:
- **Console** for errors
- **Network** tab for API calls
- **Sources** for TypeScript debugging

### Running Linter

```bash
ng lint
```

---

## Production Deployment

### Build for Production

```bash
npm run build:prod
```

### Deploy to Server

Copy contents of `dist/invoice-extractor/` to your web server.

### Environment Configuration

Update `src/environments/environment.prod.ts` with production API URL:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api'
};
```

---

## Package.json Scripts

| Script | Purpose |
|--------|---------|
| `npm start` | Dev server with auto-open |
| `npm run dev` | Dev server on port 4200 |
| `npm run build` | Development build |
| `npm run build:prod` | Production build |
| `npm run serve` | Serve on explicit port |
| `npm run lint` | Run ESLint |

---

## Dependencies

### Core Angular (v18.0.0)
- `@angular/core` - Framework
- `@angular/common` - Common utilities
- `@angular/forms` - Form handling
- `@angular/router` - Routing
- `@angular/platform-browser` - Browser API
- `@angular/animations` - Animation support

### Supporting Libraries
- `rxjs` - Reactive programming
- `zone.js` - Asynchronous operations
- `tslib` - TypeScript helpers

### Dev Dependencies
- `@angular/cli` - Development tools
- `@angular-devkit/build-angular` - Build system
- `typescript` - TypeScript compiler

---

## Known Limitations

None at this time. The application follows all Angular 18 best practices.

---

## Support

For issues or questions:
1. Check browser console for errors
2. Verify backend API is running
3. Check network requests in DevTools
4. Review component console outputs

---

## License

MIT

---

**Last Updated:** May 17, 2026  
**Angular Version:** 18.0.0  
**Node Version Required:** ≥18.0.0
