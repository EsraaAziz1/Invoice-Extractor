import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './components/upload/upload.component';
import { InvoiceTableComponent } from './components/invoice-table/invoice-table.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ApiService } from './services/api.service';
import { InvoiceData } from './models/invoice.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    UploadComponent,
    InvoiceTableComponent,
    LoaderComponent
  ],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <h1>Invoice Extractor</h1>
          <p class="subtitle">AI-powered invoice data extraction</p>
        </div>
      </header>

      <main class="app-main">
        <div class="container">
          <app-loader [isLoading]="isLoading" message="Extracting invoice data..."></app-loader>

          <div *ngIf="!isLoading">
            <app-upload
              #uploadComponent
              (fileSelected)="onFileSelected($event)"
              (uploadStarted)="onUploadStarted()">
            </app-upload>

            <app-invoice-table
              *ngIf="extractedData"
              [invoiceData]="extractedData">
            </app-invoice-table>

            <div *ngIf="successMessage" class="success-message">
              {{ successMessage }}
            </div>

            <div *ngIf="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </main>

      <footer class="app-footer">
        <p>&copy; 2024 Invoice Extractor. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .app-header {
      background: rgba(0, 0, 0, 0.1);
      padding: 40px 20px;
      text-align: center;
      color: white;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header-content h1 {
      margin: 0;
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .subtitle {
      margin: 0;
      font-size: 16px;
      opacity: 0.9;
      font-weight: 300;
    }

    .app-main {
      flex: 1;
      padding: 40px 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .success-message,
    .error-message {
      max-width: 600px;
      margin: 20px auto;
      padding: 16px;
      border-radius: 8px;
      text-align: center;
      font-size: 16px;
      animation: slideIn 0.3s ease-out;
    }

    .success-message {
      background-color: #e8f5e9;
      color: #2e7d32;
      border-left: 4px solid #2e7d32;
    }

    .error-message {
      background-color: #ffebee;
      color: #c62828;
      border-left: 4px solid #c62828;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .app-footer {
      background: rgba(0, 0, 0, 0.2);
      padding: 20px;
      text-align: center;
      color: white;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .app-header {
        padding: 24px 16px;
      }

      .header-content h1 {
        font-size: 24px;
      }

      .subtitle {
        font-size: 14px;
      }

      .app-main {
        padding: 20px 16px;
      }
    }
  `]
})
export class AppComponent {
  @ViewChild('uploadComponent') uploadComponent!: UploadComponent;

  extractedData: InvoiceData | null = null;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private apiService: ApiService) {}

  onUploadStarted(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  onFileSelected(file: File): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.extractedData = null;

    this.apiService.extractInvoice(file).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.extractedData = response.data;
          this.successMessage = 'Invoice extracted successfully!';
          if (this.uploadComponent) {
            this.uploadComponent.clearFile();
          }
        } else {
          this.errorMessage = response.message || 'Failed to extract invoice.';
          if (this.uploadComponent) {
            this.uploadComponent.setError(this.errorMessage);
          }
        }
      },
      error: (error) => {
        this.isLoading = false;
        const errorMsg = error?.error?.message || 'An error occurred during extraction.';
        this.errorMessage = errorMsg;
        if (this.uploadComponent) {
          this.uploadComponent.setError(errorMsg);
        }
        console.error('Extraction error:', error);
      }
    });
  }
}
