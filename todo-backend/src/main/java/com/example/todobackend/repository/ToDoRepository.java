package com.example.todobackend.repository;

import com.example.todobackend.entities.Priority;
import com.example.todobackend.entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToDoRepository extends JpaRepository<Todo,Long> {

    List<Todo> findByCompleted(boolean completed);

    List<Todo> findByPriority(Priority priority);
}
