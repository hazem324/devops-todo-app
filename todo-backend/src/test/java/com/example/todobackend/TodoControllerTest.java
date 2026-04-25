package com.example.todobackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
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
    void shouldGetTodos_withJsonResponse() throws Exception {
        mockMvc.perform(get("/todo"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void shouldCreateTodo_andReturnData() throws Exception {
        String json = """
        {
          "title": "Test Task"
        }
        """;

        mockMvc.perform(post("/todo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Task"))
                .andExpect(jsonPath("$.id").exists());
    }

    //  IMPORTANT: Negative test (boosts condition coverage)
    @Test
    void shouldFail_whenTitleMissing() throws Exception {
        String json = "{}";

        mockMvc.perform(post("/todo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest());
    }
}