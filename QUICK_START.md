# Quick Start Guide - Invoice Extractor

## One-Time Setup

### 1. Backend Setup (if not done already)

```bash
cd backend
npm install
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

---

## Running the Application

### Terminal 1 - Start Backend

```bash
cd backend
npm run dev
```

**Expected:**
```
Server running on port 4000
```

### Terminal 2 - Start Frontend

```bash
cd frontend
npm start
```

**Expected:**
```
✔ Compiled successfully.
✔ Built successfully.

Application bundle generation complete.

Watch mode enabled.
```

Access app at: **http://localhost:4200**

---

## Project URLs

| Service | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:4200 | Main App |
| Backend API | http://localhost:4000/api | Extract Endpoint |
| Backend Health | http://localhost:4000 | 404 (normal) |

---

## File Upload Workflow

1. **Open** http://localhost:4200 in browser
2. **Upload** invoice (PDF or image)
3. **Wait** for AI extraction (5-15 seconds)
4. **View** extracted data in table
5. **Upload** another invoice or view results

---

## Supported File Types

- ✅ PDF (.pdf)
- ✅ PNG (.png)
- ✅ JPEG (.jpg, .jpeg)

**Max Size:** 10 MB

---

## Troubleshooting

### Backend won't start

```bash
# Check port 4000 is free
# On Windows: netstat -ano | findstr :4000
# Stop any process using port 4000
```

### Frontend won't compile

```bash
cd frontend
rm -r node_modules dist .angular
npm install
npm start
```

### CORS Error

Ensure backend has CORS enabled:
```typescript
app.use(cors({ origin: 'http://localhost:4200' }));
```

### No API Response

- Verify backend is running on port 4000
- Check browser Network tab in DevTools
- Look for 404 or timeout errors

---

## File Locations

**Backend Entry:**
- `backend/src/server.ts`
- `backend/src/app.ts`

**Frontend Entry:**
- `frontend/src/main.ts`
- `frontend/src/app/app.component.ts`

**API Endpoint:**
- `backend/src/routes/invoice.routes.ts` (POST /extract)

**UI Components:**
- `frontend/src/app/components/` (Upload, Table, Loader)

---

## Stopping the Services

**Frontend:** Press `Ctrl+C` in terminal
**Backend:** Press `Ctrl+C` in terminal

---

## Building for Production

### Frontend

```bash
cd frontend
npm run build:prod
```

Output: `frontend/dist/invoice-extractor/`

### Backend

```bash
cd backend
npm run build
```

Output: `backend/dist/`

---

## Environment Variables

### Backend (.env)

```
PORT=4000
OPENAI_API_KEY=sk-...
UPLOAD_DIR=./uploads
MAX_FILE_SIZE_MB=10
```

### Frontend (src/environments/)

```typescript
// Development
apiUrl: 'http://localhost:4000/api'

// Production
apiUrl: '/api'  // Proxy through same server
```

---

## Testing the API Directly

### Extract Invoice

```bash
curl -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "invoice=@/path/to/invoice.pdf" \
  http://localhost:4000/api/invoices/extract
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "invoiceNumber": "INV-2024-001",
    "vendorName": "Vendor Name",
    ...
  }
}
```

---

## Key Features Checklist

✅ Modern Angular 18 standalone app  
✅ No SSR or hydration (pure CSR)  
✅ Clean component architecture  
✅ TypeScript strict mode  
✅ HTTP client for API integration  
✅ Responsive design  
✅ File upload with validation  
✅ Drag-and-drop support  
✅ Loading states  
✅ Error handling  
✅ Results table with formatting  
✅ Confidence score display  

---

## Development Tips

### Auto-save & Reload

Changes to `.ts` or `.css` files auto-rebuild:

```bash
npm start
# Edit a file and save
# Browser auto-refreshes
```

### Component-Level Debugging

Add console logs to components:

```typescript
ngOnInit() {
  console.log('Component initialized');
}
```

### API Response Inspection

```typescript
this.apiService.extractInvoice(file).subscribe({
  next: (response) => {
    console.log('Response:', response);
    this.extractedData = response.data;
  },
  error: (error) => {
    console.error('Error:', error);
  }
});
```

---

## Code Quality

### TypeScript Configuration

- Strict mode enabled
- No implicit any
- No unused variables
- Required return types

### Component Structure

- Standalone components
- Scoped styles
- Input/Output properties
- Lifecycle hooks

### Services

- Dependency injection
- Observable pattern
- Error handling
- Type safety

---

## Next Steps

1. ✅ Backend running on port 4000
2. ✅ Frontend running on port 4200
3. ✅ Upload invoice files
4. ✅ View extracted data
5. ✅ Deploy to production

---

**Last Updated:** May 17, 2026
