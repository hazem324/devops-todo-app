package com.example.todobackend.services;

import com.example.todobackend.entities.Priority;
import com.example.todobackend.entities.Todo;
import com.example.todobackend.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoService implements IToDoService{

    @Autowired
    ToDoRepository toDoRepository;

    @Override
    public Todo createTodo(Todo todo) {
        return null;
    }

    @Override
    public List<Todo> getAllTodos() {
        return List.of();
    }

    @Override
    public Todo getTodoById(Long id) {
        return null;
    }

    @Override
    public Todo updateTodo(Long id, Todo todo) {
        return null;
    }

    @Override
    public void deleteTodo(Long id) {

    }

    @Override
    public List<Todo> getTodosByCompleted(boolean completed) {
        return List.of();
    }

    @Override
    public List<Todo> getTodosByPriority(Priority priority) {
        return List.of();
    }

    @Override
    public Todo markAsCompleted(Long id) {
        return null;
    }

    @Override
    public Todo updatePriority(Long id, Priority priority) {
        return null;
    }
}
