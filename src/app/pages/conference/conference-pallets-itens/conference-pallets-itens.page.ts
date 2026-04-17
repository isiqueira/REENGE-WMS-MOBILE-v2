import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { BasePageService } from '../../../core/base-page.service';
import { ConferenceService } from '../conference.service';

@Component({
  selector: 'app-conference-pallets-itens',
  templateUrl: './conference-pallets-itens.page.html',
  styleUrls: ['./conference-pallets-itens.page.scss'],
  standalone: false,
})
export class ConferencePalletsItensPage implements OnInit {

  @ViewChild('identifier') identifierInput!: ElementRef;

  public itemConference: any = {};
  public sealMaster: any;
  public totalConference: number = 0;
  public isReadonly: boolean = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private conferenceService: ConferenceService,
  ) {}

  ngOnInit() {
    this.sealMaster = history.state['task_object'];
  }

  ionViewDidEnter() {
    this.clearObj();
    this.instantiateCommon();
    setTimeout(() => {
      this.identifierInput?.nativeElement?.focus();
    }, 800);
  }

  goBack() {
    this.navCtrl.navigateBack('/conference-pallets');
  }

  clearObj() {
    this.itemConference.SealParentId = null;
    this.itemConference.SealParentIdentifier = '';
    this.itemConference.Quantity = 0;
    this.itemConference.Identifier = '';
  }

  instantiateCommon() {
    this.itemConference.SealParentId = this.sealMaster.palletInfo.Id;
    this.itemConference.SealParentIdentifier = this.sealMaster.palletInfo.Identifier;
    this.totalConference = this.sealMaster.conferenceNfe.QuantityItemsReal;
    this.clearByFiscal();
  }

  beginPrompts() {
    setTimeout(() => {
      this.identifierInput?.nativeElement?.focus();
    }, 500);
  }

  clearByFiscal() {
    this.itemConference.Quantity = 1;
    this.itemConference.Identifier = '';
    this.isReadonly = false;
    this.beginPrompts();
  }

  onChangeIdentifier() {
    if (this.itemConference.Identifier !== null) {
      if (this.itemConference.Identifier.toString().indexOf('*') !== -1) {
        this.isReadonly = true;
        this.itemConference.Identifier = this.itemConference.Identifier.replace('*', '');
        this.conferencePalletItem();
      }
    }
  }

  checkBlur() {
    this.identifierInput?.nativeElement?.focus();
  }

  goToDevolution(item: any) {
    this.router.navigate(['/lost-item-devolution'], { state: { item_object: item } });
  }

  async showPromptTransferPallet(item: any) {
    const confirm = await this.basePage.newConfirm(
      'Esta caixa não pertence a este palete!',
      'Esta caixa pertence a outro palete, deseja transferir agora?'
    );
    if (confirm) {
      this.goToDevolution(item);
    } else {
      this.clearByFiscal();
    }
  }

  async showPromptKeepPallet(item: any) {
    const confirm = await this.basePage.newConfirm(
      'Esta caixa não pertence a este palete!',
      'Esta caixa pertence a outro palete, entretanto você pode deixá-la neste palete. Deseja manter?'
    );
    if (confirm) {
      this.keepBox();
    } else {
      this.showPromptTransferPallet(item);
    }
  }

  async keepBox() {
    await this.basePage.newLoading();
    this.conferenceService.changeSealFromMaster({
      parentChoose: this.itemConference.SealParentId,
      identifier: this.itemConference.Identifier,
    }).subscribe({
      next: async (data: any) => {
        await this.basePage.dismissLoading();
        if (data.Error === true) {
          await this.basePage.newAlert('Atenção', data.Message);
          this.clearByFiscal();
        } else {
          this.totalConference++;
          await this.basePage.newToastSuccess('Item mantido!');
          this.clearByFiscal();
        }
      },
      error: async (err: any) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao manter item.');
        this.clearByFiscal();
      },
    });
  }

  async conferencePalletItem() {
    await this.basePage.newLoading();
    this.conferenceService.conferenceSeal({
      parentId: this.itemConference.SealParentId,
      identifier: this.itemConference.Identifier,
    }).subscribe({
      next: async (data: any) => {
        await this.basePage.dismissLoading();
        if (data.Error === true) {
          const dataTransfer = JSON.parse(data.Data);
          if (data.ErrorCode === 201) {
            this.showPromptTransferPallet(dataTransfer);
          } else if (data.ErrorCode === 202) {
            this.showPromptKeepPallet(dataTransfer);
          } else {
            await this.basePage.newAlert('Atenção', data.Message);
            this.clearByFiscal();
          }
        } else {
          const dataTransfer = JSON.parse(data.Data);
          this.totalConference = dataTransfer.QuantityItemsReal;
          await this.basePage.newToastSuccess('Item conferido!');
          this.clearByFiscal();
        }
      },
      error: async (err: any) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao conferir item.');
        this.clearByFiscal();
      },
    });
  }
}
