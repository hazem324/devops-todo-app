import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { ToastComponent } from './toast.component';
import { ToastService } from '../../../../services/toast.service';
import { Toast } from '../../../../model/toast.model';  // ← import real type

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastSubject: Subject<Toast>;
  let toastServiceMock: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    toastSubject     = new Subject<Toast>();
    toastServiceMock = jasmine.createSpyObj('ToastService', ['error', 'success', 'info'], {
      toast$: toastSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [
        { provide: ToastService, useValue: toastServiceMock }
      ]
    }).compileComponents();

    fixture   = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with visible false', () => {
    expect(component.visible).toBeFalse();
  });

  it('should start with toast null', () => {
    expect(component.toast).toBeNull();
  });

  it('should become visible when toast$ emits', () => {
    // ← typed as Toast so 'success' satisfies ToastType, not just string
    const mockToast: Toast = { message: 'Hello', type: 'success' };
    toastSubject.next(mockToast);
    expect(component.visible).toBeTrue();
    expect(component.toast).toEqual(mockToast);
  });

  it('should hide after 3 seconds', (done) => {
    jasmine.clock().install();
    const mockToast: Toast = { message: 'Hello', type: 'success' };
    toastSubject.next(mockToast);
    expect(component.visible).toBeTrue();
    jasmine.clock().tick(3001);
    expect(component.visible).toBeFalse();
    jasmine.clock().uninstall();
    done();
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['sub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['sub'].unsubscribe).toHaveBeenCalled();
  });
});