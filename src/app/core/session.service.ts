import { Injectable } from '@angular/core';

const USER_KEY = 'user-sessionWms';
const API_KEY = 'apiUrl-sessionWms';

@Injectable({ providedIn: 'root' })
export class SessionService {
  getUser(): any {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  setUser(user: any): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  clearUser(): void {
    localStorage.removeItem(USER_KEY);
  }

  getApiUrl(): string {
    return localStorage.getItem(API_KEY) || '';
  }

  setApiUrl(url: string): void {
    localStorage.setItem(API_KEY, url);
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
