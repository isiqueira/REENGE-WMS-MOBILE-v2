import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BasePageService } from '../../../core/base-page.service';
import { TfaService } from '../tfa.service';

@Component({
  selector: 'app-tfa-pictures',
  templateUrl: './tfa-pictures.page.html',
  styleUrls: ['./tfa-pictures.page.scss'],
  standalone: false
})
export class TfaPicturesPage implements OnInit {

  public tfaCreate: any = {};
  public pictureList: any[] = [];

  // Photo slots: type 1 = SealPhoto, type 2 = LocalPhoto, type 3 = FailurePhoto
  public sealPhoto: any = null;
  public localPhoto: any = null;
  public failurePhoto: any = null;

  @ViewChild('sealInput') sealInput!: ElementRef;
  @ViewChild('localInput') localInput!: ElementRef;
  @ViewChild('failureInput') failureInput!: ElementRef;

  constructor(
    private router: Router,
    private basePage: BasePageService,
    private tfaService: TfaService
  ) {}

  ngOnInit() {
    const state = history.state['tfaCreate_object'] || {};
    this.tfaCreate = state.tfaCreate || {};
    this.pictureList = state.pictureList || [];
    this.mapPictures();
  }

  mapPictures() {
    this.sealPhoto = this.pictureList.find(p => p.PictureType === 1) || null;
    this.localPhoto = this.pictureList.find(p => p.PictureType === 2) || null;
    this.failurePhoto = this.pictureList.find(p => p.PictureType === 3) || null;
  }

  triggerCamera(inputRef: HTMLInputElement) {
    if (inputRef) {
      inputRef.click();
    }
  }

  onFileSelected(event: any, pictureType: number) {
    const file: File = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64 = e.target.result.split(',')[1];
      this.savePhoto(base64, pictureType);
    };
    reader.readAsDataURL(file);
  }

  savePhoto(base64: string, pictureType: number) {
    this.basePage.newLoading().then(() => {
      this.tfaService.savePhoto({
        TfaId: this.tfaCreate.Id,
        Image: base64,
        PictureType: pictureType
      }).subscribe({
        next: (data) => {
          this.basePage.dismissLoading().then(() => {
            const pic = { PictureType: pictureType, ImageUrl: data?.ImageUrl || base64, Id: data?.Id };
            if (pictureType === 1) this.sealPhoto = pic;
            if (pictureType === 2) this.localPhoto = pic;
            if (pictureType === 3) this.failurePhoto = pic;
            this.basePage.newToastSuccess('Foto salva com sucesso!');
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao salvar foto.');
          });
        }
      });
    });
  }

  async confirmDelete(pictureType: number) {
    const confirmed = await this.basePage.newConfirm('Remover Foto', 'Deseja remover esta foto?');
    if (!confirmed) return;
    await this.basePage.newLoading();
    this.tfaService.deletePhoto({
      TfaId: this.tfaCreate.Id,
      PictureType: pictureType
    }).subscribe({
      next: () => {
        this.basePage.dismissLoading().then(() => {
          if (pictureType === 1) this.sealPhoto = null;
          if (pictureType === 2) this.localPhoto = null;
          if (pictureType === 3) this.failurePhoto = null;
          this.basePage.newToastSuccess('Foto removida com sucesso!');
        });
      },
      error: (err) => {
        this.basePage.dismissLoading().then(() => {
          this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao remover foto.');
        });
      }
    });
  }

  ok() {
    this.router.navigate(['/tfa'], { replaceUrl: true });
  }
}
