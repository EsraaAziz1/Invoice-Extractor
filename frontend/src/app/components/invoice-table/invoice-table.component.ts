import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceData } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="invoiceData" class="card invoice-card">
      <h2>Extraction Results</h2>

      <div class="info-grid">
        <div class="info-item">
          <label>Invoice Number:</label>
          <p>{{ invoiceData.invoiceNumber || 'N/A' }}</p>
        </div>
        <div class="info-item">
          <label>Invoice Date:</label>
          <p>{{ invoiceData.invoiceDate || 'N/A' }}</p>
        </div>
        <div class="info-item">
          <label>Vendor:</label>
          <p>{{ invoiceData.vendorName || 'N/A' }}</p>
        </div>
        <div class="info-item">
          <label>Customer:</label>
          <p>{{ invoiceData.customerName || 'N/A' }}</p>
        </div>
        <div class="info-item">
          <label>Due Date:</label>
          <p>{{ invoiceData.dueDate || 'N/A' }}</p>
        </div>
        <div class="info-item">
          <label>Currency:</label>
          <p>{{ invoiceData.currency }}</p>
        </div>
      </div>

      <h3 style="margin-top: 24px; margin-bottom: 16px;">Line Items</h3>
      <div *ngIf="invoiceData.lineItems && invoiceData.lineItems.length > 0; else noItems" class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th class="text-right">Quantity</th>
              <th class="text-right">Unit Price</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of invoiceData.lineItems">
              <td>{{ item.description }}</td>
              <td class="text-right">{{ item.quantity }}</td>
              <td class="text-right">{{ item.unitPrice | currency }}</td>
              <td class="text-right">{{ item.total | currency }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #noItems>
        <p class="text-muted text-center">No line items found</p>
      </ng-template>

      <div class="totals-section">
        <div class="total-row">
          <span>Subtotal:</span>
          <strong>{{ invoiceData.subtotal | currency }}</strong>
        </div>
        <div class="total-row">
          <span>Tax:</span>
          <strong>{{ invoiceData.tax | currency }}</strong>
        </div>
        <div class="total-row total">
          <span>Total:</span>
          <strong>{{ invoiceData.totalAmount | currency }}</strong>
        </div>
        <div class="confidence">
          <span>Extraction Confidence:</span>
          <div class="confidence-bar">
            <div class="confidence-fill" [style.width.%]="invoiceData.confidenceScore * 100"></div>
          </div>
          <span class="confidence-text">{{ (invoiceData.confidenceScore * 100).toFixed(1) }}%</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .invoice-card {
      max-width: 900px;
      margin: 0 auto;
      margin-top: 20px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin: 20px 0;
    }

    .info-item {
      background-color: #f5f5f5;
      padding: 12px;
      border-radius: 6px;
    }

    .info-item label {
      font-weight: 600;
      color: #667eea;
      margin-bottom: 4px;
    }

    .info-item p {
      margin: 0;
      color: #333;
      font-size: 14px;
    }

    h3 {
      color: #333;
      font-size: 18px;
    }

    .table-wrapper {
      overflow-x: auto;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      background-color: #667eea;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: 600;
    }

    td {
      padding: 10px 12px;
      border-bottom: 1px solid #e0e0e0;
    }

    tbody tr:hover {
      background-color: #f9f9f9;
    }

    .text-right {
      text-align: right;
    }

    .totals-section {
      background-color: #f5f5f5;
      padding: 16px;
      border-radius: 8px;
      margin-top: 20px;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e0e0e0;
      font-size: 14px;
    }

    .total-row.total {
      border-bottom: 2px solid #667eea;
      font-size: 16px;
      padding: 12px 0;
      margin-top: 8px;
    }

    .total-row.total strong {
      color: #667eea;
    }

    .confidence {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
    }

    .confidence-bar {
      width: 100%;
      height: 8px;
      background-color: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      margin: 8px 0;
    }

    .confidence-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea, #764ba2);
      transition: width 0.3s ease;
    }

    .confidence-text {
      font-weight: 600;
      color: #667eea;
      font-size: 12px;
    }

    @media (max-width: 768px) {
      .info-grid {
        grid-template-columns: 1fr;
      }

      table {
        font-size: 12px;
      }

      th, td {
        padding: 8px;
      }
    }
  `]
})
export class InvoiceTableComponent {
  @Input() invoiceData: InvoiceData | null = null;
}
