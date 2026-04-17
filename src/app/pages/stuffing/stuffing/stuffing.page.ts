import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BasePageService } from '../../../core/base-page.service';
import { StuffingService } from '../stuffing.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-stuffing',
  templateUrl: './stuffing.page.html',
  styleUrls: ['./stuffing.page.scss'],
  standalone: false,
})
export class StuffingPage implements OnInit {

  public stuffingList: any[] = [];
  public initialList: any[] = [];
  public searchTerm: string = '';

  constructor(
    private router: Router,
    private basePage: BasePageService,
    private stuffingService: StuffingService,
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.searchTerm = '';
    this.getList();
  }

  formatingLocal(address: string): string {
    if (!address) return '';
    const parts = address.split('-');
    return parts.join(' - ');
  }

  async getList() {
    await this.basePage.newLoading();
    this.stuffingService.getStuffing().subscribe({
      next: async (data: any) => {
        await this.basePage.dismissLoading();
        data.forEach((element: any, idx: number) => {
          data[idx].OrderLocationAddressFormated = this.formatingLocal(element.OrderLocationAddress);
        });
        this.initialList = data;
        this.stuffingList = data;
      },
      error: async (err: any) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao carregar estufagens.');
      },
    });
  }

  filterList(event: any) {
    this.stuffingList = this.initialList;
    let val = event.target.value;
    if (val !== undefined) {
      val = val.replace('*', '');
    }
    if (val && val.trim().length > 3) {
      this.stuffingList = this.stuffingList.filter((item) =>
        item.OrderCode.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  async showPromptLocal(item: any) {
    if (!item.OrderAllowMultipleConference) {
      const barcode = await this.basePage.newGetBarcode(TypeBarcode.LOCATION);
      if (!barcode) return;
      if (barcode !== item.OrderCode) {
        await this.basePage.newAlert('Atenção', 'Código informado é Inválido.');
        this.showPromptLocal(item);
        return;
      }
      await this.basePage.newToastSuccess('Local Confirmado');
      this.goToStuffingTasks(item);
    } else {
      this.goToStuffingTasks(item);
    }
  }

  goToStuffingTasks(item: any) {
    this.router.navigate(['/stuffing-tasks'], { state: { tasklist_object: item } });
  }
}
