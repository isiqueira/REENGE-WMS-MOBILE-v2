import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasePageService } from '../../../core/base-page.service';
import { ConferenceService } from '../conference.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.page.html',
  styleUrls: ['./conference.page.scss'],
  standalone: false,
})
export class ConferencePage implements OnInit {

  nfesList: any[] = [];
  initialList: any[] = [];

  constructor(
    private router: Router,
    private basePage: BasePageService,
    private conferenceService: ConferenceService,
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getList();
  }

  initializeItems() {
    this.nfesList = this.initialList;
  }

  getList() {
    this.conferenceService.getNfeForConferences().subscribe({
      next: async (data) => {
        this.initialList = data || [];
        this.initializeItems();
        if (!data || data.length === 0) {
          await this.basePage.newToast('Nenhuma NFe em aberto para esta ordem.');
        }
      },
      error: async (err) => {
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao carregar NFes.');
      },
    });
  }

  getItems(event: any) {
    this.initializeItems();
    let val = event.target.value;
    if (val != undefined) val = val.replace('*', '');
    if (val && val.trim().length > 3) {
      this.nfesList = this.nfesList.filter((item) =>
        item.Grouper.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  goPallets(item: any) {
    this.router.navigate(['/conference-pallets'], { state: { conference_nfe_object: item } });
  }

  async conclude(item: any) {
    await this.basePage.newLoading();
    this.conferenceService.finishConference({ nfeId: item.Id }).subscribe({
      next: async (data) => {
        await this.basePage.dismissLoading();
        if (data.Error === true) {
          await this.basePage.newAlert('Atenção', data.Message);
        } else {
          await this.basePage.newToastSuccess('Conferência finalizada com sucesso!');
          this.getList();
        }
      },
      error: async (err) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao finalizar conferência.');
      },
    });
  }
}
