import { AbstractControl } from '../../node_modules/@angular/forms';

export class Validacoes {

  static ValidaCpf(controle: AbstractControl) {
    const cpf = controle.value;

    let soma: number;
    let resto: number;
    let valido: boolean;

    soma = 0;

    const regex = new RegExp('[0-9]{11}');

    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999' ||
      !regex.test(cpf)
    ) {
      return { cpfInvalido: true };
    }
    for ( let i = 1; i <= 9; ++i ) {
      soma = soma + parseInt( cpf.substring( i - 1, i ) ) * ( 11 - i );
    }
    resto = ( soma * 10 ) % 11;

    if ( resto === 10 || resto === 11 ) { resto = 0; }
    if ( resto !== parseInt( cpf.substring( 9, 10 ) ) ) { valido = false; }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt( cpf.substring( i - 1, i ) ) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if ( resto === 10 || resto === 11) { resto = 0; }
    if ( resto !== parseInt( cpf.substring( 10, 11 ) ) ) { valido = false; }
    valido = true;

    if ( valido ) { return null; }

    return { cpfInvalido: true };
  }

  static MaiorQue18Anos(controle: AbstractControl) {
    const nascimento = controle.value;
    const [ano, mes, dia] = nascimento.split('-');
    const hoje = new Date();
    const dataNascimento = new Date(ano, mes, dia, 0, 0, 0);
    const tempoParaTeste = 1000 * 60 * 60 * 24 * 365 * 18; // 18 anos em mili segundos...

    if ( hoje.getTime() - dataNascimento.getTime() >= tempoParaTeste ) {
      return null;
    }

    return { menorDeIdade: true };
  }

  static SenhasCombinam(controle: AbstractControl) {
    const senha = controle.get('senha').value;
    const confirmarSenha = controle.get('confirmarSenha').value;

    if ( senha === confirmarSenha ) { return null; }

    controle.get('confirmarSenha').setErrors({ senhasNaoCoincidem: true });
  }

  static cnpj( controle: AbstractControl ) {

    const s = controle.value;
    const cnpj = s.replace(/[^\d]+/g, '');

    // Valida a quantidade de caracteres
    if (cnpj.length !== 14) {
      return false;
    }

    // Elimina inválidos com todos os caracteres iguais
    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    // Cáculo de validação
    const t = cnpj.length - 2;
    const d = cnpj.substring(t);
    const d1 = parseInt( d.charAt(0) );
    const d2 = parseInt( d.charAt(1) );
    const calc = x => {
      const n = cnpj.substring( 0, x );
      let y = x - 7;
      let _s = 0;
      let r = 0;

        for (let i = x; i >= 1; i--) {
          _s += n.charAt(x - i) * y--;
          if (y < 2) { y = 9; }
        }

        r = 11 - _s % 11;
        return r > 9 ? 0 : r;
    };
    if ( calc( t ) === d1 && calc( t + 1 ) === d2 ) {
      return null;
    }
    return { cpfInvalido: true };
  }

  static celular( controle: AbstractControl ) {
    const celular = controle.value;
    const regex = new RegExp('[0-9]{11}');
    if (
      celular === '00000000000' ||
      celular === '11111111111' ||
      celular === '22222222222' ||
      celular === '33333333333' ||
      celular === '44444444444' ||
      celular === '55555555555' ||
      celular === '66666666666' ||
      celular === '77777777777' ||
      celular === '88888888888' ||
      celular === '99999999999' ||
      !regex.test(celular)
    ) {
      return { celular: true };
    }
    return null;
  }

}
