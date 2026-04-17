import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasePageService } from '../../../core/base-page.service';
import { ConferenceService } from '../conference.service';

@Component({
  selector: 'app-conference-pallets',
  templateUrl: './conference-pallets.page.html',
  styleUrls: ['./conference-pallets.page.scss'],
  standalone: false,
})
export class ConferencePalletsPage implements OnInit {

  conferenceNfe: any = {};
  conferencePalletsList: any[] = [];
  initialList: any[] = [];

  constructor(
    private router: Router,
    private basePage: BasePageService,
    private conferenceService: ConferenceService,
  ) {}

  ngOnInit() {
    this.conferenceNfe = history.state['conference_nfe_object'] || {};
  }

  ionViewDidEnter() {
    this.getList();
  }

  initializeItems() {
    this.conferencePalletsList = this.initialList;
  }

  getList() {
    this.conferenceService.getMasterForConferenceByNfe({ nfeId: this.conferenceNfe.Id }).subscribe({
      next: async (data) => {
        this.initialList = data;
        this.initializeItems();
      },
      error: async (err) => {
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao carregar paletes.');
      },
    });
  }

  getItems(event: any) {
    this.initializeItems();
    let val = event.target.value;
    if (val != undefined) val = val.replace('*', '');
    if (val && val.trim().length > 3) {
      this.conferencePalletsList = this.conferencePalletsList.filter((item) =>
        item.Identifier.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  goPalletItens(item: any) {
    this.router.navigate(['/conference-pallets-itens'], {
      state: { task_object: { palletInfo: item, conferenceNfe: this.conferenceNfe } },
    });
  }
}
