import { UUID } from './../utils/uuid';

export interface INotify {
  readonly id?: string;
  title?: string;
  content: string;
  color?: number | string;
  theme?: string;
  timeout?: number;
  icon?: string;
  number?: number;
  animated?: string;
  sound?: string;
  soundPath?: string;
  canClose?: boolean;
  modal?: boolean | string;
  buttonLabel?: string;
  alignX?: string;
  alignY?: string;
}

export class Notify implements INotify {

  readonly id?: string;
  title: string;
  content: string;
  timeout?: number;
  animated?: string;
  canClose?: boolean;
  modal?: boolean | string;
  buttonLabel?: string;
  alignX?: string;
  alignY?: string;
  theme?: string;
  icon?: string;

  constructor( _notify: INotify ) {
    this.theme      = _notify && _notify.theme || '';
    this.icon       = _notify && _notify.icon || '';
    this.id         = _notify && _notify.id || UUID.UUID();
    this.title      = _notify && _notify.title || null;
    this.content    = _notify && _notify.content || 'teste';
    this.timeout    = _notify && _notify.timeout || null;
    this.animated   = _notify && _notify.animated || 'swing';
    this.timeout    = this.getTimeout();
    this.canClose   = _notify && _notify.canClose || false;
    this.modal      = ( _notify && _notify.modal ) ? 'notify--modal' : 'notify--default';
    this.buttonLabel      = _notify && _notify.buttonLabel || null;
    this.alignX           = ( _notify && _notify.alignX ) ? `notify--${ _notify.alignX }` : null;
    this.alignY           = ( _notify && _notify.alignY ) ? `notify--${ _notify.alignY }` : null;
  }

  private getTimeout() {
    if ( this.timeout ) {
      return this.timeout * 1000;
    }
    return null;
  }

}
