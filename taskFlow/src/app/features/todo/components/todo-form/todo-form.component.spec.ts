import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

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
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);   // get the real service instance from Angular
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if title is empty', () => {
    component.title = '   ';
    spyOn(todoService, 'createTodo');
    component.submit();
    expect(todoService.createTodo).not.toHaveBeenCalled();
  });

  it('should call createTodo on valid submit', () => {
    component.title = 'New Task';
    spyOn(todoService, 'createTodo').and.returnValue(
      of({ id: 1, title: 'New Task', completed: false, priority: 'LOW' })
    );
    component.submit();
    expect(todoService.createTodo).toHaveBeenCalled();
  });
});