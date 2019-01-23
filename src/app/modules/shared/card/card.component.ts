import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'acc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @ViewChild('hover') hover: ElementRef;
  @Input() bgClass: string;
  @Input() disableHover: Boolean = false;

  public class: string;

  private _hasHover: boolean;

  constructor() { }

  ngOnInit() {
    this.class = `hidden`;
    this._hasHover = false;
  }

  @HostListener('mouseover') onMouseOver() {
    this.class = 'fadeInUp';
  }

  @HostListener('mouseout') onMouseOut() {
    this.class = 'fadeOutDown';
  }
}
