import { Component, OnInit } from '@angular/core';
import { BarcodeFocusService } from './core/barcode-focus.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private barcodeFocus: BarcodeFocusService) {}

  ngOnInit(): void {
    this.barcodeFocus.start();
  }
}
