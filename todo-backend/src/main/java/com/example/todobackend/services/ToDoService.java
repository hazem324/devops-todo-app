package com.example.todobackend.services;

import com.example.todobackend.entities.Priority;
import com.example.todobackend.entities.Todo;
import com.example.todobackend.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoService implements IToDoService {

    private final ToDoRepository toDoRepository;

    public ToDoService(ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    @Override
    public Todo createTodo(Todo todo) {
        return toDoRepository.save(todo);
    }

    @Override
    public List<Todo> getAllTodos() {
        return toDoRepository.findAll();
    }

    @Override
    public Todo getTodoById(Long id) {
        return toDoRepository.findById(id).orElse(null);
    }

    @Override
    public Todo updateTodo(Long id, Todo todo) {

        Todo existingTodo = toDoRepository.findById(id).orElse(null);

        if (existingTodo != null) {
            existingTodo.setTitle(todo.getTitle());
            existingTodo.setDescription(todo.getDescription());
            existingTodo.setCompleted(todo.isCompleted());
            existingTodo.setPriority(todo.getPriority());

            return toDoRepository.save(existingTodo);
        }

        return null;
    }

    @Override
    public void deleteTodo(Long id) {
        toDoRepository.deleteById(id);
    }

    @Override
    public List<Todo> getTodosByCompleted(boolean completed) {
        return toDoRepository.findAll()
                .stream()
                .filter(todo -> todo.isCompleted() == completed)
                .toList();
    }

    @Override
    public List<Todo> getTodosByPriority(Priority priority) {
        return toDoRepository.findAll()
                .stream()
                .filter(todo -> todo.getPriority() == priority)
                .toList();
    }

    @Override
    public Todo markAsCompleted(Long id) {

        Todo todo = toDoRepository.findById(id).orElse(null);

        if (todo != null) {
            todo.setCompleted(true);
            return toDoRepository.save(todo);
        }

        return null;
    }

    @Override
    public Todo updatePriority(Long id, Priority priority) {

        Todo todo = toDoRepository.findById(id).orElse(null);

        if (todo != null) {
            todo.setPriority(priority);
            return toDoRepository.save(todo);
        }

        return null;
    }

    @Override
    public List<Todo> getTodosByCompleted(boolean completed) {
        return toDoRepository.findByCompleted(completed);
    }

    @Override
    public List<Todo> getTodosByPriority(Priority priority) {
        return toDoRepository.findByPriority(priority);
    }
}
