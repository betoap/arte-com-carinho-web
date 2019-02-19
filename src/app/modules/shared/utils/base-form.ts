import { FormGroup, FormArray } from '@angular/forms';


export abstract class BaseFormComponent {

  form: FormGroup;

  constructor() { }

  abstract submit();

  abstract setFormBuilder();

  onSubmit() {
    if (this.form.valid) {
      this.submit();
    } else {
      console.error('form inválido');
      this.checkValidacoesForm(this.form);
    }
  }

  checkValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const controle = formGroup.get(field);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.checkValidacoesForm(controle);
      }
    });
  }

  clearForm() {
    this.form.reset();
  }

  checkValidTouched(field: string) {
    return (
      !this.form.get(field).valid &&
      (this.form.get(field).touched || this.form.get(field).dirty)
    );
  }

  checkRequired(field: string) {
    return (
      this.form.get(field).hasError('required') &&
      (this.form.get(field).touched || this.form.get(field).dirty)
    );
  }

  checkEmailInvalid() {
    const fieldEmail = this.form.get('email');
    if (fieldEmail.errors) {
      return fieldEmail.errors['email'] && fieldEmail.touched;
    }
  }

  aplicaCssErro(field: string) {
    return {
      'has-error': this.checkValidTouched(field),
      'has-feedback': this.checkValidTouched(field)
    };
  }

}
