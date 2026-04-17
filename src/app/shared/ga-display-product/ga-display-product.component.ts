import { Component, Input } from '@angular/core';

@Component({
  selector: 'ga-display-product',
  templateUrl: 'ga-display-product.component.html',
  standalone: false,
})
export class GaDisplayProductComponent {
  @Input() source: any;
  @Input() show: boolean = false;
}
