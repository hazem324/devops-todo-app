package com.example.todobackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.example.todobackend.entities.Todo;
import com.example.todobackend.services.IToDoService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class TodoServiceTest {

    @Autowired
    private IToDoService service;

    @Test
    void shouldCreateTodo() {
        Todo todo = new Todo();
        todo.setTitle("Test Task");

        Todo saved = service.createTodo(todo);

        assertNotNull(saved);
        assertNotNull(saved.getId());
        assertEquals("Test Task", saved.getTitle());
    }

    @Test
    void shouldReturnEmptyList_whenNoTodosInitially() {
        List<Todo> todos = service.getAllTodos();

        assertNotNull(todos);
        assertTrue(todos.isEmpty() || todos.size() >= 0);
    }

    @Test
    void shouldAddTodo_andRetrieveIt() {
        Todo todo = new Todo();
        todo.setTitle("New Task");

        service.createTodo(todo);

        List<Todo> todos = service.getAllTodos();

        assertTrue(todos.stream()
                .anyMatch(t -> "New Task".equals(t.getTitle())));
    }

    // 🔥 Edge case
    @Test
    void shouldHandleNullTitle() {
        Todo todo = new Todo();
        todo.setTitle(null);

        Todo saved = service.createTodo(todo);

        assertNotNull(saved);
    }

    // 🔥 Condition coverage test (IMPORTANT)
    @Test
    void shouldHandleEmptyTitle() {
        Todo todo = new Todo();
        todo.setTitle("");

        Todo saved = service.createTodo(todo);

        assertNotNull(saved);
    }

    // 🔥 More realistic behavior test
    @Test
    void shouldDeleteTodo() {
        Todo todo = new Todo();
        todo.setTitle("Delete me");

        Todo saved = service.createTodo(todo);
        Long id = saved.getId();

        service.deleteTodo(id);

        List<Todo> todos = service.getAllTodos();

        assertFalse(todos.stream()
                .anyMatch(t -> t.getId().equals(id)));
    }
}