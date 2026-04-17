import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { TypeBarcode } from '../enums/enums';

@Injectable({ providedIn: 'root' })
export class BasePageService {
  private loadingEl: HTMLIonLoadingElement | null = null;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
  ) {}

  // ─── Loading ────────────────────────────────────────────────────────────────

  async newLoading(message: string = 'Aguarde...'): Promise<void> {
    await this.dismissLoading();
    this.loadingEl = await this.loadingCtrl.create({ message, spinner: 'crescent' });
    await this.loadingEl.present();
  }

  async dismissLoading(): Promise<void> {
    if (this.loadingEl) {
      await this.loadingEl.dismiss().catch(() => {});
      this.loadingEl = null;
    }
  }

  // ─── Toast ───────────────────────────────────────────────────────────────────

  async newToast(message: string, duration: number = 3000): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position: 'bottom',
    });
    await toast.present();
  }

  async newToastSuccess(message: string = 'Operação realizada com sucesso!'): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
    this.playSuccess();
  }

  async newToastError(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'danger',
    });
    await toast.present();
    this.playError();
  }

  // ─── Alert ───────────────────────────────────────────────────────────────────

  async newAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async newConfirm(
    header: string,
    message: string,
    confirmText: string = 'Confirmar',
    cancelText: string = 'Cancelar',
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header,
        message,
        buttons: [
          { text: cancelText, role: 'cancel', handler: () => resolve(false) },
          { text: confirmText, handler: () => resolve(true) },
        ],
      });
      await alert.present();
    });
  }

  // ─── Barcode prompt ──────────────────────────────────────────────────────────

  async newGetBarcode(
    type: TypeBarcode,
    item?: any,
    extraButtons?: any[],
  ): Promise<string | null> {
    return new Promise(async (resolve) => {
      const typeLabel = this.getBarcodeLabel(type);

      const buttons: any[] = [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => resolve(null),
        },
        {
          text: 'Confirmar',
          cssClass: 'promptConfirm',
          handler: (data: any) => resolve(data.barcode?.trim() || null),
        },
      ];

      if (extraButtons) {
        buttons.unshift(...extraButtons);
      }

      const alert = await this.alertCtrl.create({
        header: `Leitura: ${typeLabel}`,
        message: item ? `Item: ${item}` : undefined,
        inputs: [
          {
            name: 'barcode',
            type: 'text',
            placeholder: typeLabel,
            cssClass: 'foco',
            attributes: { autocomplete: 'off', autofocus: true },
          },
        ],
        buttons,
      });

      await alert.present();

      setTimeout(() => {
        const input = document.querySelector('.alert-input') as HTMLInputElement;
        if (input) input.focus();
      }, 200);
    });
  }

  // ─── Locale formatting ───────────────────────────────────────────────────────

  formatingLocal(value: number | string, decimals: number = 2): string {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '0,00';
    return num.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  // ─── Audio ───────────────────────────────────────────────────────────────────

  playSuccess(): void {
    try {
      const audio = new Audio('assets/sounds/success.mp3');
      audio.play().catch(() => {});
    } catch (_) {}
  }

  playError(): void {
    try {
      const audio = new Audio('assets/sounds/error.mp3');
      audio.play().catch(() => {});
    } catch (_) {}
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  private getBarcodeLabel(type: TypeBarcode): string {
    const labels: Record<TypeBarcode, string> = {
      [TypeBarcode.ALL]: 'Código',
      [TypeBarcode.PALLET]: 'Pallet',
      [TypeBarcode.SEAL]: 'Lacre',
      [TypeBarcode.LOCATION]: 'Localização',
      [TypeBarcode.PRODUCT]: 'Produto',
      [TypeBarcode.NF]: 'Nota Fiscal',
      [TypeBarcode.CONTAINER]: 'Container',
      [TypeBarcode.Printer]: 'Impressora',
      [TypeBarcode.Local]: 'Local',
      [TypeBarcode.Container]: 'Container',
      [TypeBarcode.AlternativeProducts]: 'Produto',
      [TypeBarcode.ProductPresentation]: 'Apresentação',
      [TypeBarcode.TfaFailure]: 'Tipo de Avaria',
    };
    return labels[type] || 'Código';
  }
}
