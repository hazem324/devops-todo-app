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
        // GIVEN
        Todo todo = new Todo();
        todo.setTitle("Test Task");

        // WHEN
        Todo saved = service.createTodo(todo);

        // THEN
        assertNotNull(saved);
        assertNotNull(saved.getId());
        assertEquals("Test Task", saved.getTitle());
    }

    @Test
    void shouldReturnAllTodos() {
        // WHEN
        List<Todo> todos = service.getAllTodos();

        // THEN
        assertNotNull(todos);
    }
}