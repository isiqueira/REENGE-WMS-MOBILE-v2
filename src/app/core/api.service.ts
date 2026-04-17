import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private http: HttpClient,
    private session: SessionService,
  ) {}

  private getBaseUrl(): string {
    return this.session.getApiUrl();
  }

  private getHeaders(): HttpHeaders {
    const user = this.session.getUser();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (user && user.Token) {
      headers = headers.set('Authorization', `Token ${user.Token}`);
    }
    return headers;
  }

  getApi(endpoint: string, params?: any): Observable<any> {
    const url = `${this.getBaseUrl()}${endpoint}`;
    return this.http
      .get(url, { headers: this.getHeaders(), params })
      .pipe(catchError(this.handleError));
  }

  postApi(endpoint: string, body?: any): Observable<any> {
    const url = `${this.getBaseUrl()}${endpoint}`;
    return this.http
      .post(url, body, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  putApi(endpoint: string, body?: any): Observable<any> {
    const url = `${this.getBaseUrl()}${endpoint}`;
    return this.http
      .put(url, body, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  patchApi(endpoint: string, body?: any): Observable<any> {
    const url = `${this.getBaseUrl()}${endpoint}`;
    return this.http
      .patch(url, body, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteApi(endpoint: string): Observable<any> {
    const url = `${this.getBaseUrl()}${endpoint}`;
    return this.http
      .delete(url, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getDirect(url: string, params?: any): Observable<any> {
    return this.http
      .get(url, { headers: this.getHeaders(), params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => error);
  }
}
