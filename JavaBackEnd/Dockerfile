FROM eclipse-temurin:25-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE 3001

CMD ["java", "-jar", "target/prepconnect-0.0.1-SNAPSHOT.jar"]