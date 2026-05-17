import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtractApiResponse } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  extractInvoice(file: File): Observable<ExtractApiResponse> {
    const formData = new FormData();
    formData.append('invoice', file);

    return this.http.post<ExtractApiResponse>(
      `${this.apiUrl}/invoices/extract`,
      formData
    );
  }
}
