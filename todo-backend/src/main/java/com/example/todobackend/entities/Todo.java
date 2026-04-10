package com.example.todobackend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.util.Date;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String title;
    String description;
    boolean completed;
    Priority priority;
    Date createdAt;
    Date updatedAt;

    @PrePersist
public void onCreate() {
    Date now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
}

@PreUpdate
public void onUpdate() {
    this.updatedAt = new Date();
}
}
