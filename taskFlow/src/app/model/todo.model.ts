export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
}

export interface CreateTodoDto {
  title: string;
  completed: boolean;
  priority: Priority;
}

export interface UpdateTodoDto {
  title?: string;
  completed?: boolean;
  priority?: Priority;
}

export type FilterType = 'all' | 'pending' | 'done' | 'high' | 'medium' | 'low';