import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { TextareaFieldComponent } from './textarea-field/textarea-field.component';
import { StandardSelectboxComponent } from './standard-selectbox/standard-selectbox.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CheckboxComponent,
    ErrorMsgComponent,
    FormDebugComponent,
    InputFieldComponent,
    RadioButtonComponent,
    StandardSelectboxComponent,
    TextareaFieldComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CheckboxComponent,
    ErrorMsgComponent,
    FormDebugComponent,
    InputFieldComponent,
    RadioButtonComponent,
    StandardSelectboxComponent,
    TextareaFieldComponent
  ],
  entryComponents: []
})
export class CustomFormsModule { }
