import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoService } from './todo.service';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../model/todo.model';
import { environment } from '../../environments/environment';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  const baseUrl = environment.apiBaseUrl + '/todo';

  const mockTodo: Todo = { id: 1, title: 'Test', completed: false, priority: 'LOW' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service  = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());   // ensures no unexpected HTTP calls are left open

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── createTodo ────────────────────────────────────────────
  it('should POST to create a todo', () => {
    const dto: CreateTodoDto = { title: 'Test', completed: false, priority: 'LOW' };

    service.createTodo(dto).subscribe(todo => {
      expect(todo).toEqual(mockTodo);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dto);
    req.flush(mockTodo);
  });

  // ── getAllTodos ───────────────────────────────────────────
  it('should GET all todos', () => {
    const mockTodos: Todo[] = [mockTodo];

    service.getAllTodos().subscribe(todos => {
      expect(todos.length).toBe(1);
      expect(todos[0]).toEqual(mockTodo);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  // ── getTodoById ───────────────────────────────────────────
  it('should GET a todo by id', () => {
    service.getTodoById(1).subscribe(todo => {
      expect(todo).toEqual(mockTodo);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodo);
  });

  // ── updateTodo ────────────────────────────────────────────
  it('should PUT to update a todo', () => {
    const dto: UpdateTodoDto = { title: 'Updated' };
    const updated: Todo = { ...mockTodo, title: 'Updated' };

    service.updateTodo(1, dto).subscribe(todo => {
      expect(todo.title).toBe('Updated');
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dto);
    req.flush(updated);
  });

  // ── deleteTodo ────────────────────────────────────────────
  it('should DELETE a todo by id', () => {
    service.deleteTodo(1).subscribe(res => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  // ── getTodosByCompleted ───────────────────────────────────
  it('should GET todos filtered by completed=true', () => {
    const doneTodos: Todo[] = [{ ...mockTodo, completed: true }];

    service.getTodosByCompleted(true).subscribe(todos => {
      expect(todos.every(t => t.completed)).toBeTrue();
    });

    const req = httpMock.expectOne(`${baseUrl}/completed/true`);
    expect(req.request.method).toBe('GET');
    req.flush(doneTodos);
  });

  it('should GET todos filtered by completed=false', () => {
    service.getTodosByCompleted(false).subscribe(todos => {
      expect(todos).toEqual([mockTodo]);
    });

    const req = httpMock.expectOne(`${baseUrl}/completed/false`);
    expect(req.request.method).toBe('GET');
    req.flush([mockTodo]);
  });

  // ── getTodosByPriority ────────────────────────────────────
  it('should GET todos filtered by HIGH priority', () => {
    const highTodos: Todo[] = [{ ...mockTodo, priority: 'HIGH' }];

    service.getTodosByPriority('HIGH').subscribe(todos => {
      expect(todos.every(t => t.priority === 'HIGH')).toBeTrue();
    });

    const req = httpMock.expectOne(`${baseUrl}/priority/HIGH`);
    expect(req.request.method).toBe('GET');
    req.flush(highTodos);
  });

  it('should GET todos filtered by MEDIUM priority', () => {
    service.getTodosByPriority('MEDIUM').subscribe();
    const req = httpMock.expectOne(`${baseUrl}/priority/MEDIUM`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should GET todos filtered by LOW priority', () => {
    service.getTodosByPriority('LOW').subscribe();
    const req = httpMock.expectOne(`${baseUrl}/priority/LOW`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  // ── markAsCompleted ───────────────────────────────────────
  it('should PUT to mark todo as completed', () => {
    const completed: Todo = { ...mockTodo, completed: true };

    service.markAsCompleted(1).subscribe(todo => {
      expect(todo.completed).toBeTrue();
    });

    const req = httpMock.expectOne(`${baseUrl}/1/complete`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({});
    req.flush(completed);
  });

  // ── updatePriority ────────────────────────────────────────
  it('should PUT to update priority to HIGH', () => {
    const updated: Todo = { ...mockTodo, priority: 'HIGH' };

    service.updatePriority(1, 'HIGH').subscribe(todo => {
      expect(todo.priority).toBe('HIGH');
    });

    const req = httpMock.expectOne(`${baseUrl}/1/priority/HIGH`);
    expect(req.request.method).toBe('PUT');
    req.flush(updated);
  });

  it('should PUT to update priority to MEDIUM', () => {
    service.updatePriority(1, 'MEDIUM').subscribe();
    const req = httpMock.expectOne(`${baseUrl}/1/priority/MEDIUM`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...mockTodo, priority: 'MEDIUM' });
  });
});