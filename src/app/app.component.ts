import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AppState } from './modules/core/store/states/app.state';
import { AppStarted } from './modules/core/store/actions/app.actions';

/** I18N **/
import { TranslateService } from '@ngx-translate/core';

import { Usuario } from './usuario';
import { Validacoes } from './validacoes';

@Component({
  selector: 'acc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Aqui damos um nome para nosso formulário
  // E ele precisa ser do tipo FormGroup
  formularioDeUsuario: FormGroup;

  // Via DI, nós obtemos o FormBuilder.
  constructor(
    private readonly translate: TranslateService,
    private readonly store: Store<AppState>,
    private fb: FormBuilder
  ) {
    /** Set language default **/
    this.translate.setDefaultLang('pt-br');
  }

  ngOnInit(): void {
    /** Start project **/
    this.store.dispatch( new AppStarted() );

    /** Listen language */
    this.store.select('languages').subscribe( language => {
      this.translate.use( language.language );
    });

    // this.criarFormularioDeUsuario();
  }

  enviarDados() {
    console.log(this.formularioDeUsuario.value);
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group(
      {
        nome: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ])
        ],
        email: ['', Validators.compose([Validators.email])],
        cpf: [
          '',
          Validators.compose([Validators.required, Validacoes.ValidaCpf])
        ],
        nascimento: [
          '',
          Validators.compose([Validators.required, Validacoes.MaiorQue18Anos])
        ],
        senha: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
          ])
        ],
        confirmarSenha: ['', Validators.compose([Validators.required])]
      },
      {
        validator: Validacoes.SenhasCombinam
      }
    );
  }

}
