import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare var require: any;
require('./../../../assets/js/admin.js');

@Component({
  selector: 'acc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private readonly translate: TranslateService
  ) {
    /** Set language default **/
    this.translate.setDefaultLang('pt-br');
  }

  ngOnInit() {
  }

}
