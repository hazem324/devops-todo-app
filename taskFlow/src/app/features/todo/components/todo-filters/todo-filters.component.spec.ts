import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TodoFiltersComponent } from './todo-filters.component';
import { TodoService } from '../../../../services/todo.service';

describe('TodoFiltersComponent', () => {
  let component: TodoFiltersComponent;
  let fixture: ComponentFixture<TodoFiltersComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFiltersComponent],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoFiltersComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);   // get the real service instance from Angular
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filterChange on filter click', () => {
    spyOn(component.filterChange, 'emit');
    spyOn(todoService, 'getAllTodos').and.returnValue(of([]));
    component.onFilterClick('all');
    expect(component.filterChange.emit).toHaveBeenCalledWith('all');
  });

  it('should fetch pending todos on pending filter', () => {
    spyOn(todoService, 'getTodosByCompleted').and.returnValue(of([]));
    component.onFilterClick('pending');
    expect(todoService.getTodosByCompleted).toHaveBeenCalledWith(false);
  });
});