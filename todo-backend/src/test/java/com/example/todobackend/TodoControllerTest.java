package com.example.todobackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class TodoControllerTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

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
          "title": "Test Task",
          "priority": "HIGH",
          "completed": false
        }
        """;

        mockMvc.perform(post("/todo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

   
    @Test
    void shouldFail_whenTitleMissing() throws Exception {
        mockMvc.perform(post("/todo")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldFail_whenTitleBlank() throws Exception {
        String json = """
        {
          "title": "   ",
          "priority": "LOW"
        }
        """;

        mockMvc.perform(post("/todo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldDeleteTodo() throws Exception {
        // create first
        String json = """
        { "title": "Delete me", "priority": "LOW", "completed": false }
        """;

        MvcResult result = mockMvc.perform(post("/todo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andReturn();

        Long id = objectMapper.readTree(
                result.getResponse().getContentAsString()
        ).get("id").asLong();

        mockMvc.perform(delete("/todo/" + id))
                .andExpect(status().isOk());
    }

    //  PUT /todo/:id/complete → 200 + completed = true
    @Test
    void shouldMarkTodo_asCompleted() throws Exception {
        String json = """
        { "title": "Complete me", "priority": "MEDIUM", "completed": false }
        """;

        MvcResult result = mockMvc.perform(post("/todo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andReturn();

        Long id = objectMapper.readTree(
                result.getResponse().getContentAsString()
        ).get("id").asLong();

        mockMvc.perform(put("/todo/" + id + "/complete"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completed").value(true));
    }

    @Test
    void shouldGetPendingTodos() throws Exception {
        mockMvc.perform(get("/todo/completed/false"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void shouldGetTodosByPriority() throws Exception {
        mockMvc.perform(get("/todo/priority/HIGH"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void shouldUpdatePriority() throws Exception {
        String json = """
        { "title": "Priority task", "priority": "LOW", "completed": false }
        """;

        MvcResult result = mockMvc.perform(post("/todo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andReturn();

        Long id = objectMapper.readTree(
                result.getResponse().getContentAsString()
        ).get("id").asLong();

        mockMvc.perform(put("/todo/" + id + "/priority/MEDIUM"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.priority").value("MEDIUM"));
    }
}
