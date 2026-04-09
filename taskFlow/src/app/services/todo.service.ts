import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Todo, Priority, CreateTodoDto, UpdateTodoDto } from '../model/todo.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl: string = environment.apiBaseUrl + '/todo';

  constructor(private http: HttpClient) {}

  //  Create Todo
  createTodo(todo: CreateTodoDto): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo);
  }

  //  Get all Todos
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  //  Get Todo by ID
  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.baseUrl}/${id}`);
  }

  //  Update Todo
  updateTodo(id: number, todo: UpdateTodoDto): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}/${id}`, todo);
  }

  //  Delete Todo
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  //  Filter by completed
  getTodosByCompleted(completed: boolean): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/completed/${completed}`);
  }

  //  Filter by priority
  getTodosByPriority(priority: Priority): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/priority/${priority}`);
  }

  //  Mark as completed
  markAsCompleted(id: number): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}/${id}/complete`, {});
  }

  //  Update priority
  updatePriority(id: number, priority: Priority): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}/${id}/priority/${priority}`, {});
  }
}