package com.example.todobackend.repository;

import com.example.todobackend.entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoRepository extends JpaRepository<Todo,Long> {
}
