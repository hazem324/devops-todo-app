#  Build Spring Boot app with Maven

FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

# Copy Maven wrapper and pom.xml first (layer caching — avoids re-downloading deps)
COPY mvnw ./
COPY .mvn .mvn
COPY pom.xml ./

# Download dependencies without source (cached layer)
RUN ./mvnw dependency:go-offline -B

# Copy source code and build — skip tests for Docker build
COPY src ./src
RUN ./mvnw package -DskipTests

 #  Run with lightweight JRE only
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Create non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring

# Copy the built jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Change ownership to non-root user
RUN chown spring:spring app.jar

USER spring

EXPOSE 8080

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]
