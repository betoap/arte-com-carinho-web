import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '../../node_modules/@angular/forms';
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
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.criarFormularioDeUsuario();
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
