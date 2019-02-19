import { Component, OnInit, Input, Output, EventEmitter, ComponentRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'acc-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() id: string = null;
  @Input() title: string = null;
  @Input() body: string = null;

  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  public cmpRef: ComponentRef<Component>;

  public data: any;

  constructor( ) {
  }

  ngOnInit() { }

  onConfirm( event ) {
    this.confirm.emit(true);
  }

  onCancel( event ) {
    this.cancel.emit(true);
  }

  ngOnDestroy() {
    // console.log( this );
  }

}

export interface IModal {
  modalId: string;
}
