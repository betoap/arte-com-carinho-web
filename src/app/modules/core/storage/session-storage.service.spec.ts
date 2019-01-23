import { TestBed, inject } from '@angular/core/testing';

import { SessionStorageService } from './session-storage.service';

let service;

describe('SessionStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageService]
    });
    service = TestBed.get(SessionStorageService);
  });

  it('Deve ser capaz de instanciar o servico', () => {
    expect(service).toBeTruthy();
  });
  it('Deve poder armazenar um item e recuperá-lo', () => {
    service.setStorageItem('teste', 111);
    const res = service.getStorageItem('teste');
    expect(res).toBe(111);
  });
  it('Deve armazenar um item e removê-lo', () => {
    service.setStorageItem('teste1', 111);
    service.setStorageItem('teste2', 222);
    const temp = service.removeStorageItem('teste1');
    const res1 = service.getStorageItem('teste1');
    const res2 = service.getStorageItem('teste2');
    expect(res1).toBe(null);
    expect(res2).toBe(222);
  });
  it('Deve armazenar itens no storage e limpá-los', () => {
    service.setStorageItem('teste1', 111);
    service.setStorageItem('teste2', 222);
    service.clearStorage();
    const res1 = service.getStorageItem('teste1');
    const res2 = service.getStorageItem('teste2');
    expect(res1).toBe(null);
    expect(res2).toBe(null);
  });
});
