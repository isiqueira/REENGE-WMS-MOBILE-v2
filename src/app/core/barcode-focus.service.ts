import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BarcodeFocusService {
  private intervalId: any = null;

  start(): void {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      const input = document.querySelector('input.foco') as HTMLInputElement;
      if (input && document.activeElement !== input) {
        input.focus();
      }
    }, 20);

    document.addEventListener('keydown', this.handleAsterisk.bind(this));
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    document.removeEventListener('keydown', this.handleAsterisk.bind(this));
  }

  private handleAsterisk(event: KeyboardEvent): void {
    if (event.key === '*') {
      const btn = document.querySelector('button.promptConfirm') as HTMLButtonElement;
      if (btn) {
        btn.click();
      }
    }
  }
}
