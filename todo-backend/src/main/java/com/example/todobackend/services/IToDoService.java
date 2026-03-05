package com.example.todobackend.services;

import com.example.todobackend.entities.Priority;
import com.example.todobackend.entities.Todo;

import java.util.List;

public interface IToDoService {

    Todo createTodo(Todo todo);

    List<Todo> getAllTodos();

    Todo getTodoById(Long id);

    Todo updateTodo(Long id, Todo todo);

    void deleteTodo(Long id);

    List<Todo> getTodosByCompleted(boolean completed);

    List<Todo> getTodosByPriority(Priority priority);

    Todo markAsCompleted(Long id);

    Todo updatePriority(Long id, Priority priority);
}
