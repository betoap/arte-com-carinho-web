export interface ICard {
    header: string;
    img: string;
    alt?: string;
    title: string;
    text: string;
}

export class Card implements ICard {
    header: string;
    img: string;
    alt?: string;
    title: string;
    text: string;

    constructor(_card: ICard) {
        this.header = _card && _card.header || 'Lorem Ipsum';
        this.img    = _card && _card.img    || 'assets/img/dog.jpg';
        this.alt    = _card && _card.alt    || 'It Works!';
        this.title  = _card && _card.title || 'Lorem Ipsum';
        this.text   = _card && _card.text  || 'Lorem Ipsum';
    }
}
