import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card upload-card">
      <h2>Upload Invoice</h2>
      <p class="text-muted">Upload a PDF or image file of your invoice for automatic extraction</p>

      <div class="upload-area" [class.drag-over]="isDragging" 
           (dragover)="onDragOver($event)"
           (dragleave)="onDragLeave($event)"
           (drop)="onDrop($event)">
        <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <p class="upload-text">Drag and drop your invoice here, or click to select</p>
        <input type="file" (change)="onFileSelected($event)" accept=".pdf,.png,.jpg,.jpeg" hidden #fileInput>
        <button class="btn btn-primary" (click)="fileInput.click()">Choose File</button>
      </div>

      <div *ngIf="selectedFile" class="selected-file">
        <p><strong>Selected file:</strong> {{ selectedFile.name }}</p>
        <p><strong>Size:</strong> {{ (selectedFile.size / 1024).toFixed(2) }} KB</p>
        <button class="btn btn-primary" (click)="onSubmit()" [disabled]="isProcessing">
          {{ isProcessing ? 'Processing...' : 'Extract Invoice' }}
        </button>
        <button class="btn btn-secondary" (click)="clearFile()" [disabled]="isProcessing">
          Clear
        </button>
      </div>

      <div *ngIf="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .upload-card {
      max-width: 600px;
      margin: 0 auto;
    }

    .upload-area {
      border: 2px dashed #667eea;
      border-radius: 8px;
      padding: 40px 20px;
      text-align: center;
      background-color: #f8f9ff;
      cursor: pointer;
      transition: all 0.3s ease;
      margin: 20px 0;
    }

    .upload-area:hover {
      border-color: #764ba2;
      background-color: #f0f2ff;
    }

    .upload-area.drag-over {
      border-color: #764ba2;
      background-color: #e8eaff;
      transform: scale(1.02);
    }

    .upload-icon {
      width: 60px;
      height: 60px;
      color: #667eea;
      margin-bottom: 16px;
      stroke-width: 1.5;
    }

    .upload-text {
      margin-bottom: 16px;
      color: #666;
      font-size: 16px;
    }

    .selected-file {
      background-color: #e8f5e9;
      padding: 16px;
      border-radius: 8px;
      margin-top: 16px;
      border-left: 4px solid #388e3c;
    }

    .selected-file p {
      margin: 8px 0;
      color: #333;
    }

    .btn-secondary {
      background-color: #999;
      color: white;
      margin-left: 8px;
    }

    .btn-secondary:hover {
      background-color: #777;
    }

    .btn-secondary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    button {
      margin-top: 12px;
      margin-right: 8px;
    }

    @media (max-width: 600px) {
      .upload-area {
        padding: 20px;
      }

      .upload-icon {
        width: 40px;
        height: 40px;
      }
    }
  `]
})
export class UploadComponent {
  @Output() fileSelected = new EventEmitter<File>();
  @Output() uploadStarted = new EventEmitter<void>();

  selectedFile: File | null = null;
  isDragging = false;
  isProcessing = false;
  errorMessage = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFileSelection(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.handleFileSelection(event.dataTransfer.files[0]);
    }
  }

  private handleFileSelection(file: File): void {
    this.errorMessage = '';
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = 'Invalid file type. Please upload a PDF or image (PNG, JPG).';
      return;
    }

    if (file.size > maxSize) {
      this.errorMessage = 'File size exceeds 10MB limit.';
      return;
    }

    this.selectedFile = file;
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.isProcessing = true;
      this.uploadStarted.emit();
      this.fileSelected.emit(this.selectedFile);
    }
  }

  clearFile(): void {
    this.selectedFile = null;
    this.errorMessage = '';
  }

  setProcessing(processing: boolean): void {
    this.isProcessing = processing;
  }

  setError(message: string): void {
    this.errorMessage = message;
    this.isProcessing = false;
  }
}
