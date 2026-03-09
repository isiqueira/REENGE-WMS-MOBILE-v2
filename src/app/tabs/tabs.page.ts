import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  public user = { UserName: "", Password: "", Id: 0, UserId: 0 };
  constructor() {}

  login(user: { UserName: string; Password: string; Id: number; UserId: number }) {
    console.log(user);
  }
  showPromptToSetApi() {}
}
