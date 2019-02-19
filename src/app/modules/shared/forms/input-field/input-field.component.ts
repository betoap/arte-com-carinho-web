import { Component, Input, forwardRef, Output, EventEmitter, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
};

@Component({
  selector: 'acc-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input() classeCss;
  @Input() id: String = '';
  @Input() label: string;
  @Input() placeholder: String = '';
  @Input() autocomplete: String = 'off';
  @Input() type: String = 'text';
  @Input() control: FormControl;
  @Input() isReadOnly: Boolean = false;
  @Input() mask: string;
  @Input() icon: string;
  @Input() saveMasked: boolean;
  @Input() maxlength: number;
  @Input() restrictTo: string;
  @Output() changed = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();

  private innerValue: any;

  public hasError: Boolean = false;

  constructor(
    private changeRef: ChangeDetectorRef
  ) { }

  get value() {
    return this.innerValue;
  }

  setFocus( e: any) {
    this.focus.emit( e );
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.changed.emit(v);
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  readOnly() {
    if ( this.isReadOnly ) {
      return 'readonly';
    }
    return null;
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

  evtHasError( evt ) {
    if ( evt !== this.hasError ) {
      this.hasError = evt;
      this.changeRef.detectChanges();
    }
  }

  AfterViewChecked() {
    // console.log( this );
  }

}
