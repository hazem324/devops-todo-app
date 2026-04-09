export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type FilterType = 'all' | 'pending' | 'done' | 'high' | 'medium' | 'low';

export interface Todo {
  id: number;
  title: string;
  description?: string; //  added (backend has it)
  completed: boolean;
  priority: Priority;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: Priority;
}