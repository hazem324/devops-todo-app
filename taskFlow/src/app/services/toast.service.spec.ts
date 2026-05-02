import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { Toast } from '../model/toast.model';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── show ──────────────────────────────────────────────────
  it('should emit a toast via toast$ when show() is called', (done) => {
    service.toast$.subscribe((toast: Toast) => {
      expect(toast.message).toBe('Hello');
      expect(toast.type).toBe('info');
      done();
    });
    service.show('Hello', 'info');
  });

  it('should default type to info when show() called without type', (done) => {
    service.toast$.subscribe((toast: Toast) => {
      expect(toast.type).toBe('info');
      done();
    });
    service.show('Default type');
  });

  // ── success ───────────────────────────────────────────────
  it('should emit type success via success()', (done) => {
    service.toast$.subscribe((toast: Toast) => {
      expect(toast.type).toBe('success');
      expect(toast.message).toBe('Done!');
      done();
    });
    service.success('Done!');
  });

  // ── error ─────────────────────────────────────────────────
  it('should emit type error via error()', (done) => {
    service.toast$.subscribe((toast: Toast) => {
      expect(toast.type).toBe('error');
      expect(toast.message).toBe('Something went wrong');
      done();
    });
    service.error('Something went wrong');
  });

  // ── info ──────────────────────────────────────────────────
  it('should emit type info via info()', (done) => {
    service.toast$.subscribe((toast: Toast) => {
      expect(toast.type).toBe('info');
      expect(toast.message).toBe('FYI');
      done();
    });
    service.info('FYI');
  });

  // ── toast$ is observable ──────────────────────────────────
  it('should expose toast$ as an observable', () => {
    expect(service.toast$).toBeDefined();
    expect(typeof service.toast$.subscribe).toBe('function');
  });
});