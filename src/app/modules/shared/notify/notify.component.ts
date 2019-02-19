import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  ApplicationRef,
  ComponentRef } from '@angular/core';

import { INotify } from './notify.model';

@Component({
  selector: 'acc-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  public notifies: Array<INotify> = [];
  public canClose: boolean;
  public cmpRef: ComponentRef<Component>;
  @ViewChildren('notifies') _notifies !: QueryList<ElementRef>;

  constructor(
    private _appRef: ApplicationRef
  ) { }

  ngOnInit() {
    if ( !this.cmpRef ) {
      return;
    }

    const timeOut = (this.cmpRef.instance as NotifyComponent).notifies [0].timeout;

    if ( !timeOut ) {
      return;
    }

    setTimeout(() => {
      this.notifyClose();
    }, timeOut);

  }

  public notifyClose() {
    if ( this.cmpRef ) {
      this._appRef.detachView( this.cmpRef.hostView);
      this.cmpRef.destroy();
    }
  }


}
