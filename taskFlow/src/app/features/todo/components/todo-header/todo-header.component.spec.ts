import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoHeaderComponent } from './todo-header.component';

describe('TodoHeaderComponent', () => {
  let component: TodoHeaderComponent;
  let fixture: ComponentFixture<TodoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoHeaderComponent]
    }).compileComponents();

    fixture   = TestBed.createComponent(TodoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default total of 0', () => {
    expect(component.total).toBe(0);
  });

  it('should have default done of 0', () => {
    expect(component.done).toBe(0);
  });

  it('should have default pending of 0', () => {
    expect(component.pending).toBe(0);
  });

  it('should accept total as input', () => {
    component.total = 10;
    fixture.detectChanges();
    expect(component.total).toBe(10);
  });

  it('should accept done as input', () => {
    component.done = 7;
    fixture.detectChanges();
    expect(component.done).toBe(7);
  });

  it('should accept pending as input', () => {
    component.pending = 3;
    fixture.detectChanges();
    expect(component.pending).toBe(3);
  });
});