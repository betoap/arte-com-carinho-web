import { CustomFormsModule } from './customforms.module';

describe('FormsModule', () => {
  let formsModule: CustomFormsModule;

  beforeEach(() => {
    formsModule = new CustomFormsModule();
  });

  it('should create an instance', () => {
    expect(formsModule).toBeTruthy();
  });
});
