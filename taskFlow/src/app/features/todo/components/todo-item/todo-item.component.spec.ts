import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { TodoItemComponent } from './todo-item.component';
import { TodoService } from '../../../../services/todo.service';
import { Todo } from '../../../../model/todo.model';  // ← import the real type

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todoService: TodoService;

  // ← typed as Todo so priority literals are correctly narrowed
  const mockTodo: Todo = { id: 1, title: 'Test task', completed: false, priority: 'LOW' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture     = TestBed.createComponent(TodoItemComponent);
    component   = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);

    component.todo = { ...mockTodo };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return paddedId with leading zeros', () => {
    component.todo = { ...mockTodo, id: 5 };
    expect(component.paddedId).toBe('005');
  });

  it('should return correct priorityClass for LOW', () => {
    component.todo = { ...mockTodo, priority: 'LOW' };
    expect(component.priorityClass).toBe('priority-low');
  });

  it('should return correct priorityClass for HIGH', () => {
    component.todo = { ...mockTodo, priority: 'HIGH' };
    expect(component.priorityClass).toBe('priority-high');
  });

  it('should return correct badgeClass for MEDIUM', () => {
    component.todo = { ...mockTodo, priority: 'MEDIUM' };
    expect(component.badgeClass).toBe('tag-medium');
  });

  // ── onToggle: mark as completed ───────────────────────────
  it('should call markAsCompleted when todo is not completed', () => {
    component.todo = { ...mockTodo, completed: false };
    spyOn(todoService, 'markAsCompleted').and.returnValue(
      of({ ...mockTodo, completed: true })
    );
    component.onToggle();
    expect(todoService.markAsCompleted).toHaveBeenCalledWith(1);
  });

  it('should emit todoUpdated after marking as completed', () => {
    component.todo = { ...mockTodo, completed: false };
    const updated: Todo = { ...mockTodo, completed: true };
    spyOn(todoService, 'markAsCompleted').and.returnValue(of(updated));
    spyOn(component.todoUpdated, 'emit');
    component.onToggle();
    expect(component.todoUpdated.emit).toHaveBeenCalledWith(updated);
  });

  // ── onToggle: mark as pending ─────────────────────────────
  it('should call updateTodo when todo is already completed', () => {
    component.todo = { ...mockTodo, completed: true };
    spyOn(todoService, 'updateTodo').and.returnValue(
      of({ ...mockTodo, completed: false })
    );
    component.onToggle();
    expect(todoService.updateTodo).toHaveBeenCalledWith(1, { completed: false });
  });

  it('should emit todoUpdated after marking as pending', () => {
    component.todo = { ...mockTodo, completed: true };
    const updated: Todo = { ...mockTodo, completed: false };
    spyOn(todoService, 'updateTodo').and.returnValue(of(updated));
    spyOn(component.todoUpdated, 'emit');
    component.onToggle();
    expect(component.todoUpdated.emit).toHaveBeenCalledWith(updated);
  });

  // ── onSave ────────────────────────────────────────────────
  it('should call updateTodo with new title on onSave', () => {
    spyOn(todoService, 'updateTodo').and.returnValue(
      of({ ...mockTodo, title: 'Updated' })
    );
    component.onSave('Updated');
    expect(todoService.updateTodo).toHaveBeenCalledWith(1, { title: 'Updated' });
  });

  it('should not call updateTodo if title is empty', () => {
    spyOn(todoService, 'updateTodo');
    component.onSave('   ');
    expect(todoService.updateTodo).not.toHaveBeenCalled();
  });

  it('should emit todoUpdated after save', () => {
    const updated: Todo = { ...mockTodo, title: 'Updated' };
    spyOn(todoService, 'updateTodo').and.returnValue(of(updated));
    spyOn(component.todoUpdated, 'emit');
    component.onSave('Updated');
    expect(component.todoUpdated.emit).toHaveBeenCalledWith(updated);
  });

  // ── onDelete ──────────────────────────────────────────────
  it('should call deleteTodo on onDelete', () => {
    spyOn(todoService, 'deleteTodo').and.returnValue(of(void 0));
    component.onDelete();
    expect(todoService.deleteTodo).toHaveBeenCalledWith(1);
  });

  it('should emit todoDeleted after delete', () => {
    spyOn(todoService, 'deleteTodo').and.returnValue(of(void 0));
    spyOn(component.todoDeleted, 'emit');
    component.onDelete();
    expect(component.todoDeleted.emit).toHaveBeenCalledWith(1);
  });

  it('should reset isDeleting on delete error', () => {
    spyOn(todoService, 'deleteTodo').and.returnValue(
      throwError(() => ({ status: 500, error: 'Server Error' }))
    );
    component.onDelete();
    expect(component.isDeleting).toBeFalse();
  });
});