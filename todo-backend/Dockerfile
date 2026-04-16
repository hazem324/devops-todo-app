# Build Spring Boot app with Maven
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

# Copy Maven wrapper and config
COPY mvnw ./
RUN chmod +x mvnw   

COPY .mvn .mvn
COPY pom.xml ./

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build app
RUN ./mvnw package -DskipTests


# Run with lightweight JRE
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -S spring && adduser -S spring -G spring

# Copy jar
COPY --from=builder /app/target/*.jar app.jar

# Set permissions
RUN chown spring:spring app.jar

USER spring

EXPOSE 8090   

ENTRYPOINT ["java", "-jar", "app.jar"]
