package com.example.todobackend.controller;

import com.example.todobackend.entities.Priority;
import com.example.todobackend.entities.Todo;
import com.example.todobackend.services.IToDoService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
@AllArgsConstructor
public class ToDoController {

    final IToDoService toDoService;

    // Create Todo
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return toDoService.createTodo(todo);
    }

    // Get all Todos
    @GetMapping
    public List<Todo> getAllTodos() {
        return toDoService.getAllTodos();
    }

    // Get Todo by ID
    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id) {
        return toDoService.getTodoById(id);
    }

    // Update Todo
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        return toDoService.updateTodo(id, todo);
    }

    // Delete Todo
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        toDoService.deleteTodo(id);
    }

    // Get Todos by completed
    @GetMapping("/completed/{completed}")
    public List<Todo> getTodosByCompleted(@PathVariable boolean completed) {
        return toDoService.getTodosByCompleted(completed);
    }

    // Get Todos by priority
    @GetMapping("/priority/{priority}")
    public List<Todo> getTodosByPriority(@PathVariable Priority priority) {
        return toDoService.getTodosByPriority(priority);
    }

    // Mark Todo as completed
    @PutMapping("/{id}/complete")
    public Todo markAsCompleted(@PathVariable Long id) {
        return toDoService.markAsCompleted(id);
    }

    // Update priority
    @PutMapping("/{id}/priority/{priority}")
    public Todo updatePriority(@PathVariable Long id, @PathVariable Priority priority) {
        return toDoService.updatePriority(id, priority);
    }
}