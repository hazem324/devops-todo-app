package com.example.todobackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldGetTodos() throws Exception {
        mockMvc.perform(get("/todo"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldCreateTodo() throws Exception {
        String json = """
        {
          "title": "Test Task"
        }
        """;

        mockMvc.perform(post("/todo")
                .contentType("application/json")
                .content(json))
                .andExpect(status().isOk());
    }
}