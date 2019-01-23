import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'acc-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input()
  identification;
  @Input()
  labeltext;

  public idx: number;

  /**
   * @description output retorna opção escolhida no radibutton
   */
  @Output() outputResult = new EventEmitter();

  stateCheckbox: boolean;
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('pt-br');
  }

  ngOnInit() {
    this.stateCheckbox = false;
  }


  /**
   *
   * @param entry
   * @description opção para emitir opção escolhida no componente radiobutton
   */
  onSelectionChange(id, label) {
    this.stateCheckbox = !this.stateCheckbox;
    const obj = [{ id: id, label: label, state: this.stateCheckbox }];
    this.outputResult.emit(obj);
  }
}
