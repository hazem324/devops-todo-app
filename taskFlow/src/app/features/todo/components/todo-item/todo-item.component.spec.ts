import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TodoItemComponent } from './todo-item.component';
import { TodoService } from '../../../../services/todo.service';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);   // get the real service instance from Angular

    component.todo = { id: 1, title: 'Test task', completed: false, priority: 'LOW' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle todo to completed', () => {
    component.todo = { id: 1, title: 'Test', completed: false, priority: 'LOW' };
    spyOn(todoService, 'markAsCompleted').and.returnValue(
      of({ id: 1, title: 'Test', completed: true, priority: 'LOW' })
    );
    component.onToggle();
    expect(todoService.markAsCompleted).toHaveBeenCalledWith(1);
  });

  it('should toggle todo back to pending', () => {
    component.todo = { id: 1, title: 'Test', completed: true, priority: 'LOW' };
    spyOn(todoService, 'updateTodo').and.returnValue(
      of({ id: 1, title: 'Test', completed: false, priority: 'LOW' })
    );
    component.onToggle();
    expect(todoService.updateTodo).toHaveBeenCalled();
  });

  it('should delete a todo', () => {
    component.todo = { id: 1, title: 'Test', completed: false, priority: 'LOW' };
    spyOn(todoService, 'deleteTodo').and.returnValue(of(void 0));
    component.onDelete();
    expect(todoService.deleteTodo).toHaveBeenCalledWith(1);
  });
});