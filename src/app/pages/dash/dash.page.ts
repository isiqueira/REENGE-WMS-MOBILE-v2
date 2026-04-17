import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasePageService } from '../../core/base-page.service';
import { SessionService } from '../../core/session.service';

@Component({
  selector: 'app-dash',
  templateUrl: 'dash.page.html',
  styleUrls: ['dash.page.scss'],
  standalone: false,
})
export class DashPage implements OnInit {
  username: string = '';
  pages: Array<any> = [];

  constructor(
    private router: Router,
    private basePage: BasePageService,
    private session: SessionService,
  ) {}

  ngOnInit(): void {
    const user = this.session.getUser();
    this.username = user?.UserName || '';

    this.pages = [
      {
        Category: 'Tarefas',
        Items: [
          { Icon: 'arrow-down-circle', Route: '/reception', Name: 'Recebimento' },
          { Icon: 'pricetags', Route: '/storage', Name: 'Armazenamento' },
          { Icon: 'list', Route: '/picking', Name: 'Picking' },
          { Icon: 'subway', Route: '/shipping', Name: 'Expedição' },
          { Icon: 'basket', Route: '/stuffing', Name: 'Estufagem' },
          { Icon: 'checkmark-done', Route: '/conference', Name: 'Conferência' },
        ],
      },
      {
        Category: 'Manutenção',
        Items: [
          { Icon: 'battery-charging', Route: '/initial-charge', Name: 'Carga Inicial' },
          { Icon: 'swap-horizontal', Route: '/transfer', Name: 'Transferência' },
          { Icon: 'clipboard', Route: '/inventory', Name: 'Inventário' },
          { Icon: 'expand', Route: '/lost-item', Name: 'Itens Perdidos' },
          { Icon: 'construct', Route: '/tfa', Name: 'Termo de Falta e Avaria' },
        ],
      },
      {
        Category: 'Consultas',
        Items: [
          { Icon: 'barcode', Route: '/seal-consulting', Name: 'Consulta de Selo' },
          { Icon: 'pin', Route: '/location-consulting', Name: 'Consulta de Local' },
        ],
      },
      {
        Category: 'Opções de Sistema',
        Items: [
          {
            Icon: 'log-out',
            CssClass: 'hl',
            Route: null,
            Name: 'Sair',
            Action: () => this.logout(),
          },
        ],
      },
    ];
  }

  async goItemMenu(page: any): Promise<void> {
    if (page.Action) {
      page.Action();
      return;
    }
    if (page.Route) {
      this.router.navigate([page.Route]);
    }
  }

  private async logout(): Promise<void> {
    const confirmed = await this.basePage.newConfirm('Sair', 'Você deseja realmente sair?');
    if (confirmed) {
      this.session.clearUser();
      localStorage.removeItem('hideKeyboard-sessionWms');
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }
}
