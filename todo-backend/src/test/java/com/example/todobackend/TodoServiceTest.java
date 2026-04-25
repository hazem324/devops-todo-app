package com.example.todobackend;

import com.example.todobackend.entities.Priority;
import com.example.todobackend.entities.Todo;
import com.example.todobackend.services.IToDoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class TodoServiceTest {

    @Autowired
    IToDoService service;

    // ✅ Create and retrieve by id
    @Test
    void shouldCreateTodo() {
        Todo todo = new Todo();
        todo.setTitle("Test Task");
        todo.setPriority(Priority.HIGH);

        Todo saved = service.createTodo(todo);

        assertNotNull(saved);
        assertNotNull(saved.getId());
        assertEquals("Test Task", saved.getTitle());
        assertEquals(Priority.HIGH, saved.getPriority());
    }

    // ✅ List is not null
    @Test
    void shouldReturnList_notNull() {
        List<Todo> todos = service.getAllTodos();
        assertNotNull(todos);
    }

    // ✅ Created todo appears in list
    @Test
    void shouldAddTodo_andRetrieveIt() {
        Todo todo = new Todo();
        todo.setTitle("Retrieve Task");
        todo.setPriority(Priority.MEDIUM);

        service.createTodo(todo);

        List<Todo> todos = service.getAllTodos();
        assertTrue(todos.stream().anyMatch(t -> "Retrieve Task".equals(t.getTitle())));
    }

    // ✅ Default priority is LOW when null
    @Test
    void shouldDefaultPriority_toLow() {
        Todo todo = new Todo();
        todo.setTitle("Default Priority");

        Todo saved = service.createTodo(todo);

        assertNotNull(saved.getPriority());
        assertEquals(Priority.LOW, saved.getPriority());
    }

    // ✅ getTodoById
    @Test
    void shouldGetTodoById() {
        Todo todo = new Todo();
        todo.setTitle("Find by ID");
        todo.setPriority(Priority.MEDIUM);

        Todo saved = service.createTodo(todo);
        Todo found = service.getTodoById(saved.getId());

        assertNotNull(found);
        assertEquals(saved.getId(), found.getId());
    }

    // ✅ getTodoById with non-existent id returns null
    @Test
    void shouldReturnNull_whenIdNotFound() {
        Todo found = service.getTodoById(99999L);
        assertNull(found);
    }

    // ✅ updateTodo
    @Test
    void shouldUpdateTodo() {
        Todo todo = new Todo();
        todo.setTitle("Old Title");
        todo.setPriority(Priority.LOW);

        Todo saved = service.createTodo(todo);

        Todo update = new Todo();
        update.setTitle("New Title");
        update.setPriority(Priority.HIGH);
        update.setCompleted(false);

        Todo updated = service.updateTodo(saved.getId(), update);

        assertNotNull(updated);
        assertEquals("New Title",   updated.getTitle());
        assertEquals(Priority.HIGH, updated.getPriority());
    }

    // ✅ updateTodo with non-existent id returns null
    @Test
    void shouldReturnNull_whenUpdateNonExistentId() {
        Todo update = new Todo();
        update.setTitle("Ghost");
        update.setPriority(Priority.LOW);

        Todo result = service.updateTodo(99999L, update);
        assertNull(result);
    }

    // ✅ markAsCompleted
    @Test
    void shouldMarkTodo_asCompleted() {
        Todo todo = new Todo();
        todo.setTitle("Complete me");
        todo.setPriority(Priority.LOW);

        Todo saved  = service.createTodo(todo);
        Todo marked = service.markAsCompleted(saved.getId());

        assertNotNull(marked);
        assertTrue(marked.isCompleted());
    }

    // ✅ markAsCompleted with non-existent id returns null
    @Test
    void shouldReturnNull_whenMarkCompletedNonExistent() {
        Todo result = service.markAsCompleted(99999L);
        assertNull(result);
    }

    // ✅ updatePriority
    @Test
    void shouldUpdatePriority() {
        Todo todo = new Todo();
        todo.setTitle("Priority Task");
        todo.setPriority(Priority.LOW);

        Todo saved   = service.createTodo(todo);
        Todo updated = service.updatePriority(saved.getId(), Priority.HIGH);

        assertNotNull(updated);
        assertEquals(Priority.HIGH, updated.getPriority());
    }

    // ✅ getTodosByCompleted
    @Test
    void shouldGetTodosByCompleted() {
        Todo todo = new Todo();
        todo.setTitle("Done Task");
        todo.setPriority(Priority.LOW);

        Todo saved = service.createTodo(todo);
        service.markAsCompleted(saved.getId());

        List<Todo> done = service.getTodosByCompleted(true);
        assertTrue(done.stream().anyMatch(t -> t.getId().equals(saved.getId())));
    }

    // ✅ getTodosByPriority
    @Test
    void shouldGetTodosByPriority() {
        Todo todo = new Todo();
        todo.setTitle("High Task");
        todo.setPriority(Priority.HIGH);

        Todo saved = service.createTodo(todo);

        List<Todo> highList = service.getTodosByPriority(Priority.HIGH);
        assertTrue(highList.stream().anyMatch(t -> t.getId().equals(saved.getId())));
    }

    // ✅ deleteTodo removes from list
    @Test
    void shouldDeleteTodo() {
        Todo todo = new Todo();
        todo.setTitle("Delete me");
        todo.setPriority(Priority.LOW);

        Todo saved = service.createTodo(todo);
        Long id    = saved.getId();

        service.deleteTodo(id);

        assertNull(service.getTodoById(id));
    }
}
