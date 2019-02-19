import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'acc-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @ViewChild('carousel')
  carousel: ElementRef;

  public totalItens: Array<any>;
  private itensContainer: any;
  private bulletContainer: any;

  constructor( ) { }

  ngOnInit() {
    this.totalItens = [];
    setTimeout( () => this.parse(), 9 );
  }

  parse() {
    this.bulletContainer = this.carousel.nativeElement.querySelector( 'footer ul' );
    this.itensContainer  = this.carousel.nativeElement.querySelector( '.content ul' );
    this.itensContainer.classList.add('animated');
    this.itensContainer.classList.add('transition');
    const elementsLi = this.itensContainer.querySelectorAll( 'li' );
    elementsLi.forEach( ( _element, index) => {
      _element['style'].left = `${index}00%`;
      this.totalItens.push( index );
    });
    setTimeout( () => {
      this.changeStep(0);
    }, 99 );
  }

  changeStep( event ) {
    const element = this.itensContainer;
    element['style'].left = `-${event}00%`;
    this.clearBullets();
    this.activeBullet( event );
  }

  activeBullet( id ) {
    const elementUl = this.bulletContainer;
    const elementsLi = elementUl.querySelectorAll( 'li' );
    elementsLi[id].classList.add('__active');
  }

  clearBullets( ) {
    const elementUl = this.bulletContainer;
    const elementsLi = elementUl.querySelectorAll( 'li' );
    elementsLi.forEach( ( _element ) => {
      _element.classList.remove('__active');
    });
  }

}


