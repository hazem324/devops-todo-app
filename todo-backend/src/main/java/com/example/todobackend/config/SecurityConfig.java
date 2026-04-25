package com.example.todobackend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${cors.allowed-origins}")
    private String allowedOrigins;

 
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            //  Disable CSRF — REST APIs use tokens, not cookies, so CSRF is not needed
            .csrf(AbstractHttpConfigurer::disable)
 
            //  Allow CORS from Angular dev server and Docker frontend
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
 
            //  Stateless — no session, each request is independent
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
 
            //  Allow all requests (add authentication rules here when ready)
            .authorizeHttpRequests(auth ->
                auth.anyRequest().permitAll()
            );
 
        return http.build();
    }
 
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
 
        //  Allow Angular dev server + Docker frontend
        config.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));
 
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
 
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}