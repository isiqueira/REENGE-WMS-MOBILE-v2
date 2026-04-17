import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BasePageService } from '../../../core/base-page.service';
import { ShippingService } from '../shipping.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
  standalone: false,
})
export class ShippingPage implements OnInit {

  public shippingList: any[] = [];
  public initialList: any[] = [];
  public searchTerm: string = '';

  constructor(
    private router: Router,
    private basePage: BasePageService,
    private shippingService: ShippingService,
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.searchTerm = '';
    this.getList();
  }

  async getList() {
    await this.basePage.newLoading();
    this.shippingService.getShippings().subscribe({
      next: async (data: any) => {
        await this.basePage.dismissLoading();
        this.initialList = data;
        this.shippingList = data;
      },
      error: async (err: any) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao carregar expedições.');
      },
    });
  }

  filterList(event: any) {
    this.shippingList = this.initialList;
    let val = event.target.value;
    if (val !== undefined) {
      val = val.replace('*', '');
    }
    if (val && val.trim().length > 2) {
      this.shippingList = this.shippingList.filter((item) =>
        item.OrderCode.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  goToShippingTasks(item: any) {
    this.router.navigate(['/shipping-tasks'], { state: { tasklist_object: item } });
  }
}
