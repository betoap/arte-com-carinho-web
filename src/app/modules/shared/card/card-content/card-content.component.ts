import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'acc-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss']
})
export class CardContentComponent implements OnInit {

  @Input() quantity: string;
  @Input() title: string;
  @Input() text: string;
  @Input() footerText: string;
  @Input() classIco: string;

  constructor() { }

  ngOnInit() {
  }

}
