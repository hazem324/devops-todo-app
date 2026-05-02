import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { TodoFormComponent } from './todo-form.component';
import { TodoService } from '../../../../services/todo.service';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture     = TestBed.createComponent(TodoFormComponent);
    component   = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default selectedPriority as LOW', () => {
    expect(component.selectedPriority).toBe('LOW');
  });

  it('should change selectedPriority on selectPriority()', () => {
    component.selectPriority('HIGH');
    expect(component.selectedPriority).toBe('HIGH');
  });

  it('should not submit if title is empty', () => {
    component.title = '   ';
    spyOn(todoService, 'createTodo');
    component.submit();
    expect(todoService.createTodo).not.toHaveBeenCalled();
  });

  it('should not submit if already submitting', () => {
    component.title        = 'Task';
    component.isSubmitting = true;
    spyOn(todoService, 'createTodo');
    component.submit();
    expect(todoService.createTodo).not.toHaveBeenCalled();
  });

  it('should call createTodo with correct dto on valid submit', () => {
    component.title            = 'New Task';
    component.selectedPriority = 'HIGH';
    spyOn(todoService, 'createTodo').and.returnValue(
      of({ id: 1, title: 'New Task', completed: false, priority: 'HIGH' })
    );
    component.submit();
    expect(todoService.createTodo).toHaveBeenCalledWith({
      title: 'New Task', completed: false, priority: 'HIGH'
    });
  });

  it('should emit todoCreated after successful submit', () => {
    const created = { id: 1, title: 'New Task', completed: false, priority: 'LOW' };
    component.title = 'New Task';
    spyOn(todoService, 'createTodo').and.returnValue(of(created));
    spyOn(component.todoCreated, 'emit');
    component.submit();
    expect(component.todoCreated.emit).toHaveBeenCalledWith(created);
  });

  it('should reset title after successful submit', () => {
    component.title = 'New Task';
    spyOn(todoService, 'createTodo').and.returnValue(
      of({ id: 1, title: 'New Task', completed: false, priority: 'LOW' })
    );
    component.submit();
    expect(component.title).toBe('');
  });

  it('should reset isSubmitting on error', () => {
    component.title = 'New Task';
    spyOn(todoService, 'createTodo').and.returnValue(
      throwError(() => ({ status: 500, error: 'Error' }))
    );
    component.submit();
    expect(component.isSubmitting).toBeFalse();
  });
});