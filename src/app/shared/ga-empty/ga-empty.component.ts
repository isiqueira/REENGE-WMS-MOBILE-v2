import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'ga-empty',
  templateUrl: 'ga-empty.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class GaEmptyComponent implements OnChanges {
  @Input() text: string = 'Nenhuma tarefa pendente de execução.';
  @Input() title: string = 'Tudo Ok por aqui!';
  @Input() show: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.cdr.detectChanges();
  }
}
