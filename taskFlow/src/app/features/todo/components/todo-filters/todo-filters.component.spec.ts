import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TodoFiltersComponent } from './todo-filters.component';
import { TodoService } from '../../../../services/todo.service';
import { Todo } from '../../../../model/todo.model';  // ← import real type

describe('TodoFiltersComponent', () => {
  let component: TodoFiltersComponent;
  let fixture: ComponentFixture<TodoFiltersComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFiltersComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture     = TestBed.createComponent(TodoFiltersComponent);
    component   = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default activeFilter as all', () => {
    expect(component.activeFilter).toBe('all');
  });

  // ── filter: all ───────────────────────────────────────────
  it('should call getAllTodos on all filter', () => {
    spyOn(todoService, 'getAllTodos').and.returnValue(of([]));
    component.onFilterClick('all');
    expect(todoService.getAllTodos).toHaveBeenCalled();
  });

  it('should emit filterChange with all', () => {
    spyOn(todoService, 'getAllTodos').and.returnValue(of([]));
    spyOn(component.filterChange, 'emit');
    component.onFilterClick('all');
    expect(component.filterChange.emit).toHaveBeenCalledWith('all');
  });

  it('should emit filteredResults on all filter', () => {
    const todos: Todo[] = [{ id: 1, title: 'T', completed: false, priority: 'LOW' }];
    spyOn(todoService, 'getAllTodos').and.returnValue(of(todos));
    spyOn(component.filteredResults, 'emit');
    component.onFilterClick('all');
    expect(component.filteredResults.emit).toHaveBeenCalledWith(todos);
  });

  // ── filter: pending ───────────────────────────────────────
  it('should call getTodosByCompleted(false) on pending filter', () => {
    spyOn(todoService, 'getTodosByCompleted').and.returnValue(of([]));
    component.onFilterClick('pending');
    expect(todoService.getTodosByCompleted).toHaveBeenCalledWith(false);
  });

  // ── filter: done ──────────────────────────────────────────
  it('should call getTodosByCompleted(true) on done filter', () => {
    spyOn(todoService, 'getTodosByCompleted').and.returnValue(of([]));
    component.onFilterClick('done');
    expect(todoService.getTodosByCompleted).toHaveBeenCalledWith(true);
  });

  // ── filter: high ──────────────────────────────────────────
  it('should call getTodosByPriority(HIGH) on high filter', () => {
    spyOn(todoService, 'getTodosByPriority').and.returnValue(of([]));
    component.onFilterClick('high');
    expect(todoService.getTodosByPriority).toHaveBeenCalledWith('HIGH');
  });

  // ── filter: medium ────────────────────────────────────────
  it('should call getTodosByPriority(MEDIUM) on medium filter', () => {
    spyOn(todoService, 'getTodosByPriority').and.returnValue(of([]));
    component.onFilterClick('medium');
    expect(todoService.getTodosByPriority).toHaveBeenCalledWith('MEDIUM');
  });

  // ── filter: low ───────────────────────────────────────────
  it('should call getTodosByPriority(LOW) on low filter', () => {
    spyOn(todoService, 'getTodosByPriority').and.returnValue(of([]));
    component.onFilterClick('low');
    expect(todoService.getTodosByPriority).toHaveBeenCalledWith('LOW');
  });

  it('should update activeFilter on click', () => {
    spyOn(todoService, 'getTodosByPriority').and.returnValue(of([]));
    component.onFilterClick('high');
    expect(component.activeFilter).toBe('high');
  });
});