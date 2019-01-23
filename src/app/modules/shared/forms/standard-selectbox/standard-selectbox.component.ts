import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { IListItem } from '../../list-component/list-item.model';

@Component({
  selector: 'acc-standard-selectbox',
  templateUrl: './standard-selectbox.component.html'
})
export class StandardSelectboxComponent implements OnInit {
  @Input() items: Array<IListItem>;
  @Input() selectType: string;
  @Input() label?: string;
  @Input() classeCss?: string;
  @Input() setCurrent?: number;
  @Output() changeItem = new EventEmitter();

  public showDropDown: boolean;
  public toggleIcon: string;

  constructor(private rendered: Renderer2) {
    this.showDropDown = false;
  }

  ngOnInit() {
  }

  /**
   * @description
   * Clique da div sobre o select para abrir ou fechar à lista customizada
   */
  onClick() {

    if (this.showDropDown === false) {
      this.show();
    } else {
      this.hide();
    }

  }

  /**
   * @param data
   * @description
   * Recebe o valor de opção através do clique da lista customizada
   */
  onClickOption(itemValue, id) {
    this.setCurrent = id;
    this.changeItem.emit(itemValue);
    this.hide();
  }

  /**
   * @description
   * Mostra opções customizadas
   */
  show() {
    this.showDropDown = true;
    this.toggleIcon = 'fields__arrowIcon-rotate';
  }

  /**
   * @description
   * Esconde opções customizadas
   */
  hide() {
    this.showDropDown = false;
    this.toggleIcon = '';
  }
}
