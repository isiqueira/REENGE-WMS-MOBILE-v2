import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { LostItemService } from '../lost-item.service';

@Component({
  selector: 'app-lost-item-devolution',
  templateUrl: './lost-item-devolution.page.html',
  styleUrls: ['./lost-item-devolution.page.scss'],
  standalone: false
})
export class LostItemDevolutionPage implements OnInit {

  @ViewChild('identifierInput') identifierInputRef!: ElementRef;

  public identifierValue: string | null = null;
  public devolutionItem: any = {};
  public isReadonly: boolean = false;

  public step: any = {};
  public icones: any = {};

  constructor(
    private navCtrl: NavController,
    private basePage: BasePageService,
    private lostItemService: LostItemService
  ) {}

  ngOnInit() {
    this.devolutionItem = history.state['item_object'] || {};
  }

  ionViewDidEnter() {
    this.clearObj();
    this.focusFire();
  }

  clearObj() {
    this.step = { One: true, Two: false, Three: false };
    this.icones = {
      One:   { Icon: 'barcode', Color: 'primary' },
      Two:   { Icon: 'barcode', Color: 'primary' },
      Three: { Icon: 'barcode', Color: 'primary' }
    };
  }

  goBack() {
    this.navCtrl.back();
  }

  focusFire() {
    this.identifierValue = null;
    this.isReadonly = false;
    setTimeout(() => {
      if (this.identifierInputRef?.nativeElement) {
        this.identifierInputRef.nativeElement.focus();
      }
    }, 800);
  }

  onChangeIdentifier() {
    if (this.identifierValue !== null) {
      if (this.identifierValue.toString().indexOf('*') !== -1) {
        this.isReadonly = true;
        this.identifierValue = this.identifierValue.replace('*', '');

        if (this.step.One) {
          if (this.identifierValue === this.devolutionItem.SealParentOriginIdentifier) {
            this.icones.One.Icon = 'checkmark';
            this.icones.One.Color = 'secondary';
            this.step = { One: false, Two: true, Three: false };
            this.basePage.newToastSuccess('Palete de origem correta').then(() => this.focusFire());
          } else {
            this.icones.One.Icon = 'close';
            this.icones.One.Color = 'danger';
            this.step = { One: true, Two: false, Three: false };
            this.basePage.newAlert('Atenção', 'Palete de origem inválido').then(() => this.focusFire());
          }

        } else if (this.step.Two) {
          if (this.identifierValue === this.devolutionItem.SealParentDestinationIdentifier) {
            this.icones.Two.Icon = 'checkmark';
            this.icones.Two.Color = 'secondary';
            this.step = { One: false, Two: false, Three: true };
            this.basePage.newToastSuccess('Palete de destino correta').then(() => this.focusFire());
          } else {
            this.icones.Two.Icon = 'close';
            this.icones.Two.Color = 'danger';
            this.step = { One: false, Two: true, Three: false };
            this.basePage.newAlert('Atenção', 'Palete de destino inválido').then(() => this.focusFire());
          }

        } else if (this.step.Three) {
          if (this.identifierValue === this.devolutionItem.SealIdentifier) {
            this.icones.Three.Icon = 'checkmark';
            this.icones.Three.Color = 'secondary';
            this.step = { One: false, Two: false, Three: false };
            this.basePage.newToastSuccess('Caixa correta').then(() => this.finish());
          } else {
            this.icones.Three.Icon = 'close';
            this.icones.Three.Color = 'danger';
            this.step = { One: false, Two: false, Three: true };
            this.basePage.newAlert('Atenção', 'Caixa inválida').then(() => this.focusFire());
          }
        }
      }
    }
  }

  checkBlur() {
    this.focusFire();
  }

  finish() {
    this.basePage.newLoading().then(() => {
      this.lostItemService.finishLostItem({ taskId: this.devolutionItem.Id }).subscribe({
        next: (data) => {
          this.basePage.dismissLoading().then(() => {
            if (data?.Error === true) {
              this.basePage.newAlert('Atenção', data.Message).then(() => this.focusFire());
            } else {
              this.basePage.newToastSuccess('Item devolvido com sucesso!').then(() => this.goBack());
            }
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao devolver item.').then(() => this.focusFire());
          });
        }
      });
    });
  }
}
